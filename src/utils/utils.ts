import { SortName } from '../const';
import { CardOffers, City } from '../types/offers';

export const getSortedOffers = (offers: CardOffers[], sortName: SortName, city: City): CardOffers[] => {
  switch (sortName) {
    case SortName.PriceAscending:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortName.PriceDescending:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortName.RateDescending:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers.slice().filter((item) => item.city.name === city.title);
  }
};

export const checkDescription = (description : string) => description.length > 80 ? `${description.slice(0, 80)}...` : description;
