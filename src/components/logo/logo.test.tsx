import Logo from './logo';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Fragment } from 'react';


const history = createMemoryHistory();
const mockStore = configureMockStore();
describe('Component: Logo', () => {
  it('should render "Logo"', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Logo />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
  it('should redirect root url when user clicked Link', () => {
    const store = mockStore({});
    history.push('/fake');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<Fragment>Main Page</Fragment>} />
            <Route path={'/fake'} element={<Logo />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Main Page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });
});
