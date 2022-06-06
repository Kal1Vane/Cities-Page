
export type City = {
  latitude: number;
  longitude: number;
  title: string;
  zoom: number;
};

export type CityArray = City[];


export type CoordinateCard = {
  latitude: number;
  longitude: number;
  zoom: number;
}
export type CityCard = {
  name: string,
  coordinate: CoordinateCard,
}
export type hostObject = {
  avatarUrl: string,
  isPro: boolean,
  name: string,
  id: number,
}
export type CardOffers = {
  city: CityCard,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: Array<string>,
  host: hostObject,
  description: string,
  location: CoordinateCard,
  id: number,
};

export type CardObjectNewArray = CardOffers[];
