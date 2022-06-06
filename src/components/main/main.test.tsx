import {   makeFakeOffer, makeFakeOffers } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, NameSpace, SortName } from '../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import Main from './main';
import { Routes, Route } from 'react-router-dom';

const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component Main Screen', () => {
  it('should render correctly Main', () => {
    const store = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.offers] : {
        isDataLoaded: true,
        offerList: fakeOffers,
        filterOffers: fakeOffers,
        currentCity: DEFAULT_CITY,
        currentSort: SortName.Popular,
        currentHover: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main}
              element={<Main />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${DEFAULT_CITY.title}`, 'i'))).toBeInTheDocument();
  });
  it('should render correctly Main Empty', () => {
    const store = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.offers] : {
        isDataLoaded: true,
        offerList: fakeOffers,
        filterOffers: [],
        currentCity: DEFAULT_CITY,
        currentSort: SortName.Popular,
        currentHover: null,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main}
              element={<Main />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/OpenStreetMap/i)).not.toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
