import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { CardOffers } from './offers';

export type State = ReturnType< typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  currentFavorites: CardOffers[],
}

