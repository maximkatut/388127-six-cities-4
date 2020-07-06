import reducer, {initialState} from './offers-reducer';
import {cities, offers} from '../test-data';
import {ActionType} from '../actions/types';
import {getOffersBySort} from '../utils';
import {SortType} from '../const';

describe(`Reducer works correctly`, () => {
  it(`Reducer has to return initial state if new state is undefined`, () => {
    expect(reducer(undefined, {}))
    .toEqual(initialState);
  });

  it(`Reducer should return new state with new city`, () => {
    expect(reducer({
      activeCityName: `Amsterdam`,
      offers,
      cities,
      activeOffer: null
    }, {
      type: ActionType.CHANGE_CITY,
      payload: cities[0].name
    })).toEqual({
      activeCityName: `Gomel`,
      offers,
      cities,
      activeOffer: null
    });
  });

  it(`Reducer should return new state with new offers`, () => {
    expect(reducer({
      activeCityName: `Amsterdam`,
      offers: [],
      cities,
      activeOffer: null
    }, {
      type: ActionType.GET_OFFERS,
      payload: offers
    })).toEqual({
      activeCityName: `Amsterdam`,
      offers,
      cities,
      activeOffer: null
    });
  });

  it(`Reducer should return new state with new offers sorted by type`, () => {
    expect(reducer({
      activeCityName: `Amsterdam`,
      offers,
      cities,
      activeOffer: null
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: getOffersBySort(SortType.LOW_HIGHT, offers)
    })).toEqual({
      activeCityName: `Amsterdam`,
      offers: offers.slice().sort((leftOffer, rightOffer) => leftOffer.price - rightOffer.price),
      cities,
      activeOffer: null
    });
  });

  it(`Reducer should return new state with new active offer`, () => {
    expect(reducer({
      activeCityName: `Amsterdam`,
      offers,
      cities,
      activeOffer: offers[1]
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: offers[0]
    })).toEqual({
      activeCityName: `Amsterdam`,
      offers: offers.slice().sort((leftOffer, rightOffer) => leftOffer.price - rightOffer.price),
      cities,
      activeOffer: offers[0]
    });
  });
});
