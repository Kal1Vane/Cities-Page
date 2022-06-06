import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { DEFAULT_CITY, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import CityScreen from './city';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.offers] : {
    currentCity: DEFAULT_CITY,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CityScreen />
    </HistoryRouter>
  </Provider>
);

describe('Component : CityScreen', () => {

  it('should render "CityScreen" when user navigate to /main', () => {
    render(fakeApp);

    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toBeInstanceOf(Array);
    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toHaveLength(6);
  });
});


