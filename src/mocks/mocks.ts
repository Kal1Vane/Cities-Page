import { AuthorizationStatus, SortName } from '../const';
import { address, commerce, database, datatype,  image, internet, random } from 'faker';
import { CardOffers, City, CoordinateCard, hostObject } from '../types/offers';
import { AuthInfo } from '../types/auth-info';
import { nanoid } from 'nanoid';


const NUMBER_OF_FAKE_CASES = 10;
const NUMBER_OF_FAKE_OFFERS_NEADBY = 3;
const MIN_PRICE = 100;
const MAX_PRICE = 300;
const MAX_RATING = 5;
const PRECISION_RATING = 1;
const ZOOM = 10;

export const makeFakeLocation = (): CoordinateCard => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: ZOOM,
} as CoordinateCard);

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: address.cityName(),
  title: 'Paris',
  zoom: ZOOM,
} as unknown as City);

export const makeFakeUser = (): hostObject => ({
  id: String(nanoid(10)),
  avatarUrl: internet.avatar(),
  name: internet.userName(),
  isPro: datatype.boolean(),
} as unknown as hostObject);

export const makeFakeOffer = (): CardOffers => ({
  id:  String(nanoid(10)),
  city: makeFakeCity(),
  images: new Array(5).fill(null).map(image.image),
  previewImage: image.image(),
  title: commerce.productName(),
  description: commerce.productDescription(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  type: database.type(),
  rating: datatype.float({ max: MAX_RATING, precision: PRECISION_RATING }),
  bedrooms: datatype.number(NUMBER_OF_FAKE_CASES),
  maxAdults: datatype.number(NUMBER_OF_FAKE_CASES),
  price: datatype.number({ min: MIN_PRICE, max: MAX_PRICE }),
  goods: new Array(NUMBER_OF_FAKE_CASES).fill(null).map(random.word),
  host: makeFakeUser(),
  location: makeFakeLocation(),
} as unknown as CardOffers);

export const makeFakeOffers = (): CardOffers[] => (
  new Array(datatype.number(NUMBER_OF_FAKE_CASES + 1)).fill(null).map(makeFakeOffer) as CardOffers[]);

export const makeFakeOffersNearby = (): CardOffers[] => (
  new Array(datatype.number(NUMBER_OF_FAKE_OFFERS_NEADBY)).fill(null).map(makeFakeOffer) as CardOffers[]);

export const makeFakeFavoriteOffers = (): CardOffers[] => (
  makeFakeOffers().map((offer) => (
    {...offer, isFavorite: true})) as CardOffers[]);

export const makeFakeComment = (): Comment => ({
  comment: commerce.productDescription(),
  date: datatype.datetime().toISOString(),
  id: String(nanoid(10)),
  rating: datatype.float({ max: MAX_RATING, precision: PRECISION_RATING }),
  user: makeFakeUser(),
} as unknown as Comment);

export const makeFakeAuthInfo = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: String(nanoid(10)),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.string(),
} as unknown as AuthInfo);

export const makeFakeComments = (): Comment[] => (
  new Array(datatype.number(NUMBER_OF_FAKE_CASES)).fill(null).map(makeFakeComment) as Comment[]);

export const getRandomSortOptions = (): SortName => (
  random.arrayElement(Object.values(SortName)) as SortName);

export const getAuthorizationStatus = (): AuthorizationStatus => (
  random.arrayElement(Object.values(AuthorizationStatus)) as AuthorizationStatus);

// export const getRandomMode = (): PlaceCardMode => (
//   random.arrayElement(Object.values(PlaceCardMode)) as PlaceCardMode);
