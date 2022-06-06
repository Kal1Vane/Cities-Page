import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, AuthorizationStatus } from '../../const';
import { makeFakeFavoriteOffers } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Favorites from './favorites';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const fakeFavorites = makeFakeFavoriteOffers();
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.user] : {
    authorizationStatus: AuthorizationStatus.Auth,
    currentFavorites: fakeFavorites,
  },
});

describe('Component: Favorites', () => {
  it('should render correctly Favorites', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
