import { AnyAction } from 'redux';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';
import {configureMockStore} from '@jedmao/redux-mock-store';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browse-history/browse-history', () => fakeHistory);
const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });
  it('should not to be redirect /lose because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Main});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});


