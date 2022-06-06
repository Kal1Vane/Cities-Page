import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, AuthorizationStatus, SortName, AppRoute } from '../../const';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import Login from '../login/login';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();


describe('Component Header', () => {
  it('should render correctly,status AUTH', () => {

    const store = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.offers] : {
        currentSort: SortName.Popular,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly,status NO_AUTH',() => {
    const store = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.offers] : {
        currentSort: SortName.Popular,
      },
    });
    history.push('/header');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login}
              element={<Login />}
            />
            <Route path='/header' element={<Header />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.queryByText(/by KaliVane/i)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});

