import { CardOffers } from '../../types/offers';
import { Comment } from '../../types/comments';
import { NameSpace } from '../../const';
import { createSlice } from '@reduxjs/toolkit';

type PropertyProcess = {
  currentComments : Comment[],
  currentNearby: CardOffers[],
  currentOffer : CardOffers | null,
}

const initialState : PropertyProcess = {
  currentComments : [],
  currentNearby: [],
  currentOffer : null,
};

export const propertyProcess = createSlice({
  name: NameSpace.property,
  initialState,
  reducers: {
    currentFetchOffer : (state,action) => {
      state.currentOffer = action.payload;
    },
    loadCommentsAction : (state,action) => {
      state.currentComments = action.payload;
    },
    loadNearbyAction : (state,action) => {
      state.currentNearby = action.payload;
    },
  },
});


export const {currentFetchOffer,loadCommentsAction,loadNearbyAction} = propertyProcess.actions;
