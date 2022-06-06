import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, NameSpace, ScreenType } from '../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import PlacesList from './places-list';
import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { makeFakeOffers } from '../../mocks/mocks';


const mockStore = configureMockStore();
const offers = [...makeFakeOffers(),...makeFakeOffers(),...makeFakeOffers()];
offers.length = 6;
describe.each(offers)('Component: Place Card', (offer) => {
  it(`should render "Place Card "${offer.id}`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.user] : {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.offers] : {
        currentHover: null,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main}
              element={
                <PlacesList
                  screenType={ScreenType.Main}
                  card={offer}
                />
              }
            />
            <Route path={`property/${offer.id}`} element={
              <Fragment>This is place offer screen {offer.id}</Fragment>
            }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
    const text = offer.title;
    const test = new RegExp(text, 'i');
    expect(screen.getByText(test)).toBeInTheDocument();

  });
});
