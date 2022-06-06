import { cities, DEFAULT_CITY, SortName } from '../../const';
import { makeFakeCity, makeFakeOffer, makeFakeOffers } from '../../mocks/mocks';
import { changeCurrentHover, changeFavoriteActionCard, changeSort, changingCity, loadOffers, offersProcess } from './offers';


describe('Reducer: offersReducer', () => {

  it('changing city', () => {
    const state  = {
      isDataLoaded: false,
      offerList: [],
      filterOffers: [],
      currentCity: DEFAULT_CITY,
      currentSort: SortName.PriceAscending,
      currentHover: null,
    };
    const cityFake = makeFakeCity();

    expect(offersProcess.reducer(state,changingCity(cityFake)))
      .toEqual({
        isDataLoaded: false,
        offerList: [],
        filterOffers: [],
        currentCity: DEFAULT_CITY,
        currentSort: SortName.Popular,
        currentHover: null,
      });
    expect(offersProcess.reducer(state,changingCity(cities[0])))
      .toEqual({
        isDataLoaded: false,
        offerList: [],
        filterOffers: [],
        currentCity: cities[0],
        currentSort: SortName.Popular,
        currentHover: null,
      });
  });

  it('set Offers', () => {
    const state  = {
      isDataLoaded: false,
      offerList: [],
      filterOffers: [],
      currentCity: DEFAULT_CITY,
      currentSort: SortName.Popular,
      currentHover: null,
    };
    const offers = makeFakeOffers();
    expect(offersProcess.reducer(state,loadOffers(offers)))
      .toEqual({
        isDataLoaded: true,
        offerList: [...offers],
        filterOffers: [],
        currentCity: DEFAULT_CITY,
        currentSort: SortName.Popular,
        currentHover: null,
      });

  });

  it('set sort', () => {
    const offersMake = makeFakeOffers();
    const state  = {
      isDataLoaded: true,
      offerList: offersMake,
      filterOffers: [],
      currentCity: DEFAULT_CITY,
      currentSort: SortName.RateDescending,
      currentHover: null,
    };

    const filterOffersMake = offersMake.slice().sort((a, b) => b.price - a.price);
    expect(offersProcess.reducer(state,changeSort(SortName.PriceDescending)))
      .toEqual({
        isDataLoaded: true,
        offerList: offersMake,
        filterOffers: filterOffersMake,
        currentCity: DEFAULT_CITY,
        currentSort: SortName.PriceDescending,
        currentHover: null,
      });

  });

  it('set hover', () => {
    const state = {
      isDataLoaded: true,
      offerList: [],
      filterOffers: [],
      currentCity: DEFAULT_CITY,
      currentSort: SortName.Popular,
      currentHover: null,
    };
    const hoverCard = makeFakeOffer();

    expect(offersProcess.reducer(state,changeCurrentHover(hoverCard)))
      .toEqual({
        isDataLoaded: true,
        offerList: [],
        filterOffers: [],
        currentCity: DEFAULT_CITY,
        currentSort: SortName.Popular,
        currentHover: hoverCard,
      });
  });

  it('set favoriteCard', () => {
    const offers = makeFakeOffers();
    const newOffersFake = [...offers];
    const offer = makeFakeOffer();
    offers.push(offer);
    const state = {
      isDataLoaded: true,
      offerList: [],
      filterOffers: offers,
      currentCity: DEFAULT_CITY,
      currentSort: SortName.Popular,
      currentHover: null,
    };
    const newOffer = {...offer,isFavorite : !offer.isFavorite};
    newOffersFake.push(newOffer);
    expect(offersProcess.reducer(state,changeFavoriteActionCard(offer)))
      .toEqual({
        isDataLoaded: true,
        offerList: [],
        filterOffers: newOffersFake,
        currentCity: DEFAULT_CITY,
        currentSort: SortName.Popular,
        currentHover: null,
      });


  });
});
