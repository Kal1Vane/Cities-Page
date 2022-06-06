import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AuthorizationStatus,AppRoute } from '../const';
import { dropEmail, saveEmail } from '../services/email';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthData } from '../types/auth-data';
import { NewComment } from '../types/comments';
import { CardOffers } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import { loadOffers } from './offers/offers';
import {  currentFetchOffer, loadCommentsAction, loadNearbyAction } from './property/property';
import { setFavorites, requireAuthorization, updateOffer } from './user/user';

type idOffer = string | undefined;

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffersAction',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<CardOffers[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch ( error ) {
      errorHandle(error as Error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, idOffer, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffer',
  async (id, {dispatch,extra: api}) => {
    try {
      const {data} = await api.get<CardOffers>(`${APIRoute.Offer + id}`);
      dispatch(currentFetchOffer(data));
    } catch ( error ) {
      toast.info('Page not Found');
      dispatch(redirectToRoute(AppRoute.Main));
    }
  },
);

export const fetchFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CardOffers[]>(APIRoute.Favorite);
    dispatch(setFavorites(data));
  };

export const fetchCommentsAction = (offerId: idOffer): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadCommentsAction(data));
  };
export const fetchNearbyAction = (offerId: idOffer): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CardOffers[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearbyAction(data));
  };

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch ( error ) {
      errorHandle(error as Error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/login',
  async ({login:email , password} , {dispatch, extra: api}) => {
    try {
      const { data: {token}} = await api.post<UserData>(APIRoute.Login, {email,password});
      saveToken(token);
      saveEmail(email);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Favorites));
    } catch ( error ) {
      errorHandle(error as Error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void , undefined , {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async (_arg, { dispatch, extra:api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropEmail();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(redirectToRoute(AppRoute.Main));
      fetchOffersAction();
    } catch ( error ) {
      errorHandle(error as Error);
    }
  },
);


export const setCommentAction = ({offerId, comment, rating}: NewComment): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
      dispatch(loadCommentsAction(data));
    } catch (error) {
      toast.info('Сomment not added, error');
    }
  };

export const changeFavoriteAction = ({id, isFavorite}: CardOffers ): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const status = Number(isFavorite);
    const {data} = await api.post<CardOffers>(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(updateOffer(data));
  };
