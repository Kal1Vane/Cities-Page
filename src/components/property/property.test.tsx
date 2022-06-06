import { random } from 'faker';
import { makeFakeOffer, makeFakeOffers, makeFakeOffersNearby } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus,  NameSpace } from '../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import Property from './property';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
const fakeOffer = random.arrayElement(fakeOffers);
const fakeOffersNearby = makeFakeOffersNearby();
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.user] : {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },

  [NameSpace.property] : {
    currentComments : [],
    currentNearby: fakeOffersNearby,
    currentOffer : fakeOffer,
  },
  [NameSpace.offers] : {
    currentHover: null,
  },
});

describe('Component Property',() => {
  it('should render "Property" when user navigate to "/hotels/:id"', () => {
    history.push(AppRoute.Property.replace(':id', fakeOffer.id.toString()));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(`${fakeOffer.description}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
