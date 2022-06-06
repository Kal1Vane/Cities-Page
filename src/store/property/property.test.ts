import { makeFakeComments, makeFakeOffer, makeFakeOffersNearby } from '../../mocks/mocks';
import { currentFetchOffer, loadCommentsAction, loadNearbyAction, propertyProcess } from './property';


describe('Reducer: propertyReducer', () => {
  it('set offer current', () => {
    const state = {
      currentComments : [],
      currentNearby: [],
      currentOffer : null,
    };
    const offers = makeFakeOffer();
    expect(propertyProcess.reducer(state,currentFetchOffer(offers)))
      .toEqual({
        currentComments : [],
        currentNearby: [],
        currentOffer : offers,
      });
  });
  it('set comment', () => {
    const state = {
      currentComments : [],
      currentNearby: [],
      currentOffer : null,
    };
    const comments = makeFakeComments();
    expect(propertyProcess.reducer(state,loadCommentsAction(comments)))
      .toEqual({
        currentComments : [...comments],
        currentNearby: [],
        currentOffer : null,
      });
  });
  it('set nearby', () => {
    const state = {
      currentComments : [],
      currentNearby: [],
      currentOffer : null,
    };
    const nearby = makeFakeOffersNearby();
    expect(propertyProcess.reducer(state,loadNearbyAction(nearby)))
      .toEqual({
        currentComments : [],
        currentNearby: [...nearby],
        currentOffer : null,
      });
  });
});
