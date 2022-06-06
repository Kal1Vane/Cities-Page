import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { offersProcess } from './offers/offers';
import { propertyProcess } from './property/property';
import { userProcess } from './user/user';

export const rootReducer = combineReducers({
  [NameSpace.user] : userProcess.reducer,
  [NameSpace.property] : propertyProcess.reducer,
  [NameSpace.offers]: offersProcess.reducer,
});
