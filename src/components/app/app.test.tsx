import { random } from 'faker';
import {  makeFakeFavoriteOffers, makeFakeOffer, makeFakeOffers, makeFakeOffersNearby } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY, NameSpace, SortName } from '../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
const fakeOffer = random.arrayElement(fakeOffers);
const fakeOffersNearby = makeFakeOffersNearby();
const fakeFavorites = [...makeFakeFavoriteOffers(),...makeFakeFavoriteOffers()];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.user] : {
    authorizationStatus: AuthorizationStatus.NoAuth,
    currentFavorites: fakeFavorites,
  },

  [NameSpace.property] : {
    currentComments : [],
    currentNearby: fakeOffersNearby,
    currentOffer : fakeOffer,
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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', ()=> {

  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toBeInstanceOf(Array);
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@test');
    userEvent.type(screen.getByPlaceholderText(/Password/i), '123456');

    expect(screen.getByDisplayValue(/test@test/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should render \'Login\' when usen navigate to \'/favorites\' NO_AUTH', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);


    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toBeInstanceOf(Array);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render \'Favorites\' when use navigate to \'/favorites\' AUTH',  () => {
    history.push(AppRoute.Favorites);
    const storeAuth = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.Auth,
        currentFavorites: [...fakeFavorites],
      },
      [NameSpace.property] : {
        currentComments : [],
        currentNearby: fakeOffersNearby,
        currentOffer : fakeOffer,
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

    const fakeAppAuth = (
      <Provider store={storeAuth}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );


    render(fakeAppAuth);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render \'Property\' when use navigate to \'/propert:id\' AUTH', () => {
    history.push(AppRoute.Property);

    render(fakeApp);
    const text = fakeOffer.description;
    const test = new RegExp(text, 'i');
    expect(screen.getByText(test)).toBeInTheDocument();
  });

  it('should render "Page not Found" when use navigato to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);
    expect(screen.getByText(/Go back/i)).toBeInTheDocument();
    expect(screen.getByText(/Whoops/i)).toBeInTheDocument();
  });
});
