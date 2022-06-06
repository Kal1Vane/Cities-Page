import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import FormComment from './form-comment';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.user] : {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  [NameSpace.property] : {
    currentComments : [],
  },
});

describe('Component: Favorites', () => {
  it('should render correctly FormComment', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormComment />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i), 'Тестовое сообщение');
    expect(screen.getByDisplayValue(/Тестовое сообщение/i)).toBeInTheDocument();
  });
  it('should render correctly FormComment Empty', () => {
    const storeNoAuth = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.property] : {
        currentComments : [],
      },
    });
    render(
      <Provider store={storeNoAuth}>
        <HistoryRouter history={history}>
          <FormComment />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/To submit review please make sure to set/i)).toBeNull() ;
    expect(screen.queryByText(/Tell how was your stay, what you like and what can be improved/i)).toBeNull() ;

  });

});
