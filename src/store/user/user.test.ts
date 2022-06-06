import { random } from 'faker';
import { AuthorizationStatus } from '../../const';
import { makeFakeFavoriteOffers, makeFakeOffer } from '../../mocks/mocks';
import { requireAuthorization, setFavorites, updateOffer } from './user';
import { userProcess } from './user';

const levels = [AuthorizationStatus.NoAuth,AuthorizationStatus.Auth,AuthorizationStatus.Unknown];
const fakeFavorites = makeFakeFavoriteOffers();

describe.each(levels)('Reducer User forEach AuthStatus', (level)=> {
  const state = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    currentFavorites: [],
  };
  it(`should update authorizationStatus to ${level}`, () => {
    expect(userProcess.reducer(state,requireAuthorization(level)))
      .toEqual({authorizationStatus: level,currentFavorites: []});
  });
});
describe('Reducer User Unknow Action', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown,currentFavorites: []});
  });
});
describe('Reducer User check Favorites Action', () => {
  it('set Favorites', () => {
    const fakerOffersFavorite = [makeFakeFavoriteOffers(),makeFakeFavoriteOffers()];
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      currentFavorites: [],
    };
    expect(userProcess.reducer(state,setFavorites(fakerOffersFavorite)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth,currentFavorites: [...fakerOffersFavorite]});
  });

  it('add card from Favorites', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      currentFavorites: fakeFavorites,
    };
    const fakeOffer = {...makeFakeOffer(), isFavorite: true};
    const newFavorites = [...fakeFavorites, fakeOffer];

    expect(userProcess.reducer(state,updateOffer(fakeOffer)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth,currentFavorites: newFavorites});
  });
  it('remove card from Favorites', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      currentFavorites: fakeFavorites,
    };
    const randomFavoriteOffer = random.arrayElement(fakeFavorites);
    const updatedOfferFromServer = {...randomFavoriteOffer, isFavorite: false};
    const expectedFavorites = fakeFavorites.filter((offer) => offer.id !== randomFavoriteOffer.id);

    expect(userProcess.reducer(state,updateOffer(updatedOfferFromServer)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth,currentFavorites: expectedFavorites});
  });
});

