import { AuthorizationStatus, NameSpace } from '../../const';
import { CardOffers } from '../../types/offers';
import { State } from '../../types/state';


export const getFavorites = (state: State): CardOffers[] => state[NameSpace.user].currentFavorites;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
