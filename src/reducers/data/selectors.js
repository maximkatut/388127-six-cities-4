import {createSelector} from "reselect";
import {getOffersByCity, getOffersBySort} from '../../utils';
import NameSpace from "../name-space";
import {getActiveCity, getSortType} from '../offers/selectors';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getOffersNearby = (state) => {
  return state[NameSpace.DATA].offersNearby;
};

export const getErrorStatus = (state) => {
  return state[NameSpace.DATA].isError;
};

export const getStatusRequest = (state) => {
  return state[NameSpace.DATA].isBusy;
};

export const getFavoritesCity = (state) => {
  return state[NameSpace.DATA].favorites.reduce((cities, offer) => {
    if (cities.indexOf(offer.city.name) < 0) {
      cities.push(offer.city.name);
    }
    return cities;
  }, []);
};

export const getFavorites = (state) => {
  return state[NameSpace.DATA].favorites;
};

export const getOffersByActiveCity = createSelector(
    getOffers,
    getActiveCity,
    (offers, activeCityName) => {
      return getOffersByCity(activeCityName, offers);
    }
);

export const getOffersBySortType = createSelector(
    getOffersByActiveCity,
    getSortType,
    (offers, sortType) => {
      return getOffersBySort(sortType, offers);
    }
);
