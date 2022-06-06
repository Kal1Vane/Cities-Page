import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace,  SortName, DEFAULT_CITY } from '../../const';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import Filter from './filter';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.offers] : {
    isDataLoaded: true,
    offerList: [],
    filterOffers: [],
    currentCity: DEFAULT_CITY,
    currentSort: SortName.Popular,
    currentHover: null,
  },
});

describe('Component: Favorites', () => {
  it('should render correctly Favorites Empty', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Filter />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/selection-open/i));
    expect(screen.getByTestId(/filter-list/i)).toHaveClass('places__options--opened');
  });
});
