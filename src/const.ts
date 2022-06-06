import leaflet from 'leaflet';

export enum AppRoute {
  Login = '/login',
  DevNotLogin = '/notlogin',
  Property = '/property/:id',
  Main = '/',
  DevMainEmpty = '/emptymain',
  Favorites = '/favorites',
  DevFavoritesEmpty = '/favoritesempty',
}

export enum NameSpace {
  offers = 'OFFERS',
  property = 'PROPERTY',
  user = 'USER',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export const MAP_ZOOM = 12;
export const DEFAULT_CITY = {
  title: 'Paris',
  zoom: 12,
  latitude: 48.86,
  longitude: 2.35,
};

export enum SortName {
  Popular = 'Popular',
  PriceAscending = 'Price: low to high',
  PriceDescending = 'Price: high to low',
  RateDescending = 'Top rated first',
}

export enum ScreenType {
  Main = 'Main screen',
  Offer = 'Offer screen',
  Favorites = 'Favorites screen'
}

export const cities = [
  {
    title: 'Paris',
    zoom: 12,
    latitude: 48.86,
    longitude: 2.35,
  },
  {
    title: 'Cologne',
    zoom: 12,
    latitude: 50.938361,
    longitude: 6.959974,
  },
  {
    title: 'Brussels',
    zoom: 12,
    latitude: 50.846557,
    longitude: 4.351697,
  },
  {
    title: 'Amsterdam',
    zoom: 12,
    latitude: 52.37454,
    longitude: 4.897976,
  },
  {
    title: 'Hamburg',
    zoom: 12,
    latitude: 53.550341,
    longitude: 10.000654,
  },
  {
    title: 'Dusseldorf',
    zoom: 12,
    latitude: 51.225402,
    longitude: 6.776314,
  },
];

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Offer = '/hotels/',
}


export enum HTTP_CODE {
  BAD_REQUST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}


export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
export const MAX_RATING = 5;
