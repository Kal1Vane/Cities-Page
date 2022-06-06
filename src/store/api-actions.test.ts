import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute, AppRoute } from '../const';
import { changeFavoriteAction, checkAuthAction, fetchFavoritesAction, fetchNearbyAction, fetchOfferAction, fetchOffersAction, loginAction, logoutAction, setCommentAction } from './api-actions';
import { requireAuthorization, setFavorites, updateOffer } from './user/user';
import { AuthData } from '../types/auth-data';
import { makeFakeComments, makeFakeFavoriteOffers, makeFakeOffer, makeFakeOffers, makeFakeOffersNearby } from '../mocks/mocks';
import { currentFetchOffer, loadCommentsAction, loadNearbyAction } from './property/property';
import { loadOffers } from './offers/offers';
import { datatype } from 'faker';
import { NewComment } from '../types/comments';
describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api,Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();

    mockAPI.onGet(AppRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(AppRoute.Login)
      .reply(200, {token:'secret'});

    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());


    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
    expect(Storage.prototype.setItem).toBeCalledWith('email', 'test@test.ru');
  });

  it('should dispatch Load Offers when GET hotels', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    expect(Storage.prototype.removeItem).toBeCalledWith('email');
  });

  it('should dispatch set comments when Post /comments/:id', async () => {
    const fakeOffer = makeFakeOffer();
    const fakeComments = makeFakeComments();
    const fakeUserComment = 'test';
    const fakeUserRating = datatype.float({max: 5, precision: 1});
    const newComment : NewComment = {
      offerId: fakeOffer.id,
      comment: fakeUserComment,
      rating: fakeUserRating,
    };
    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeOffer.id}`)
      .reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(setCommentAction(newComment));
    expect(store.getActions()).toEqual([loadCommentsAction(fakeComments)]);
  });

  it('should dispatch Load Offer when GET hotel/offer:id', async () => {
    const fakerOffer = makeFakeOffer();
    const id = fakerOffer.id.toString();
    mockAPI
      .onGet(`${APIRoute.Offer + id}`)
      .reply(200, fakerOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferAction(id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(currentFetchOffer.toString());
  });

  it('should dispatch Load Favorites when GET favorite', async () => {
    const fakeFavorite = makeFakeFavoriteOffers();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeFavorite);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setFavorites.toString());
    expect(store.getActions()).toEqual([setFavorites(fakeFavorite)]);
  });
  it('should dispatch Load Offer when GET hotel/nearby:id', async () => {
    const fakeNearby = makeFakeOffersNearby();
    const fakeOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}/nearby`)
      .reply(200, fakeNearby);

    const store = mockStore();

    await store.dispatch(fetchNearbyAction(fakeOffer.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadNearbyAction.toString());
    expect(store.getActions()).toEqual([loadNearbyAction(fakeNearby)]);
  });
  it('should dispatch change favotire when Post favorite/id/status', async () => {
    const fakeOffer = makeFakeOffer();
    const newFavoriteStatus = !fakeOffer.isFavorite;
    const expectedFakeOffer = {...fakeOffer, isFavorite: newFavoriteStatus};
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeOffer.id.toString()}/${Number(newFavoriteStatus)}`)
      .reply(200, expectedFakeOffer);

    const store = mockStore();

    await store.dispatch(changeFavoriteAction(expectedFakeOffer));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(updateOffer.toString());
    expect(store.getActions()).toEqual([
      updateOffer(expectedFakeOffer),
    ]);
  });
});
