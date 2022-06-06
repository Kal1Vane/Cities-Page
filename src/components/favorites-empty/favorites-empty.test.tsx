import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Favorites from '../favorites/favorites';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.user] : {
    authorizationStatus: AuthorizationStatus.Auth,
    currentFavorites: [],
  },
});

describe('Component: Favorites', () => {
  it('should render correctly Favorites Empty', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
