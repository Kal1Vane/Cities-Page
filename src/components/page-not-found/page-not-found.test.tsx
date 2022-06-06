import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageNotFound from './page-not-found';
import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';


const mockStore = configureMockStore();


describe('Component: Page Not Found', () => {
  it('should render "Page not Found"', () => {
    const history = createMemoryHistory();
    const store = mockStore({});
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="*"
              element={
                <PageNotFound />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Whoops!/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect url when user clicked Link/PageNotFound', () => {
    const store = mockStore({});
    const history = createMemoryHistory();
    history.push('/test/route');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<Fragment>Main Page</Fragment>} />
            <Route path='*'
              element={
                <PageNotFound />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Main Page/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });
});
