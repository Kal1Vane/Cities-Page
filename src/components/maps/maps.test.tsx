import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, DEFAULT_CITY, NameSpace } from '../../const';
import { Routes, Route } from 'react-router-dom';
import Maps from './maps';
import { makeFakeOffers } from '../../mocks/mocks';


const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Maps', () => {
  it('should render "Maps"', () => {
    const store = mockStore({
      [NameSpace.offers] : {
        currentHover: null,
      },
    });
    const offers = [...makeFakeOffers(),...makeFakeOffers()];
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main}
              element={
                <Maps offersCard={offers}
                  city={DEFAULT_CITY}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
    expect(screen.getAllByAltText('Marker')).toHaveLength(offers.length);

  });
});
