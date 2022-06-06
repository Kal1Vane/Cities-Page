import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace , cities, SortName } from '../../const';
import { CardOffers, City } from '../../types/offers';
import { getSortedOffers } from '../../utils/utils';

type OffersProcess = {
  isDataLoaded: boolean,
  offerList: CardOffers[],
  filterOffers: CardOffers[],
  currentCity: City,
  currentSort: SortName,
  currentHover: CardOffers | null,
}

const initialState : OffersProcess = {
  isDataLoaded: false,
  offerList: [],
  filterOffers: [],
  currentCity: DEFAULT_CITY,
  currentSort: SortName.Popular,
  currentHover: null,
};

export const offersProcess = createSlice({
  name: NameSpace.offers,
  initialState,
  reducers: {
    loadOffers : (state,action) => {
      state.offerList = action.payload;
      state.filterOffers = state.offerList.filter((item) => item.city.name === (state.currentCity as City).title);
      state.isDataLoaded = true;
    },
    changingCity : (state,action) => {
      const choise = cities.find((town) => town.title === action.payload.title);
      choise ? state.currentCity = choise : state.currentCity = DEFAULT_CITY;
      state.currentSort = SortName.Popular;
      state.filterOffers = state.offerList.filter((item) => item.city.name === (state.currentCity as City).title);
    },
    changeSort : (state,action) => {
      state.currentSort = action.payload;
      state.filterOffers = state.currentSort === SortName.Popular ?
        getSortedOffers(state.offerList,action.payload,state.currentCity) :
        getSortedOffers(state.filterOffers,action.payload,state.currentCity);
    },
    changeCurrentHover : (state, action) => {
      state.currentHover = action.payload;
    },
    changeFavoriteActionCard : (state, action) => {
      state.filterOffers.forEach((offer) => {
        if( offer.id === action.payload.id){
          offer.isFavorite = !offer.isFavorite;
        }
      });
    },
  },
});

export const {loadOffers,changingCity,changeSort,changeCurrentHover,changeFavoriteActionCard} = offersProcess.actions;
