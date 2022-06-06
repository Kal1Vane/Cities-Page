import { NameSpace, SortName } from '../../const';
import { CardOffers, City } from '../../types/offers';
import { State } from '../../types/state';


export const getDataLoaded = (state: State): boolean => state[NameSpace.offers].isDataLoaded;
export const getOffersList = (state: State): CardOffers[] => state[NameSpace.offers].offerList;
export const getFilterOffers = (state:State) : CardOffers[] => state[NameSpace.offers].filterOffers;
export const getCurrentCity = (state:State) : City => state[NameSpace.offers].currentCity;
export const getCurrentSort = (state:State) : SortName => state[NameSpace.offers].currentSort;
export const getHoverOffer = (state:State) : CardOffers | null => state[NameSpace.offers].currentHover;
