import { NameSpace } from '../../const';
import { CardOffers } from '../../types/offers';
import { State } from '../../types/state';
import { Comment } from '../../types/comments';

export const getComments = (state: State): Comment[] => state[NameSpace.property].currentComments;
export const getNearby = (state: State): CardOffers[] => state[NameSpace.property].currentNearby;
export const getOfferLoad = (state:State) : CardOffers | null => state[NameSpace.property].currentOffer;
