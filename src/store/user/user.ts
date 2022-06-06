import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';

const initialState : UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentFavorites: [],
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization : (state,action) => {
      state.authorizationStatus = action.payload;
    },
    setFavorites : (state,action) => {
      state.currentFavorites = action.payload;
    },
    updateOffer : (state,action) => {
      if(action.payload.isFavorite) {
        state.currentFavorites = [...state.currentFavorites, action.payload];
      } else {
        state.currentFavorites  = state.currentFavorites.filter((offer) => offer.id !== action.payload.id);
      }
    },
  },
});

export const {requireAuthorization,setFavorites,updateOffer} = userProcess.actions;
