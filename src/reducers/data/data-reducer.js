import {extend} from "../../utils";
import {ActionCreator} from '../../actions/data-actions';
import {ActionType} from '../../actions/types';
import getAdaptedOffers from '../../adapter/offers';
import getAdaptedReviews from '../../adapter/reviews';
import NameSpace from "../name-space";

const initialState = {
  offers: [],
  isError: {
    status: false,
    message: ``
  },
  isBusy: false
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const adapatedData = getAdaptedOffers(response.data);
        dispatch(ActionCreator.loadOffers(adapatedData));
      });
  },
  loadReviews: () => (dispatch, getState, api) => {
    const id = getState()[NameSpace.OFFERS].activeOffer.id;
    return api.get(`/comments/${id}`)
      .then((response) => {
        const adapatedData = getAdaptedReviews(response.data);
        dispatch(ActionCreator.loadReviews(adapatedData));
      });
  },
  postReview: ({comment, rating}) => (dispatch, getState, api) => {
    const id = getState()[NameSpace.OFFERS].activeOffer.id;
    return api.post(`/comments/${id}`,
        {
          "comment": comment,
          "rating": Number(rating)
        }
    )
      .then((response) => {
        dispatch(ActionCreator.setRequestStatusBusy(true));
        const adapatedData = getAdaptedReviews(response.data);
        dispatch(ActionCreator.loadReviews(adapatedData));
      })
      .then(()=> {
        dispatch(ActionCreator.setRequestStatusBusy(false));
      });
  },
  loadOffersNearby: () => (dispatch, getState, api) => {
    const id = getState()[NameSpace.OFFERS].activeOffer.id;
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const adapatedData = getAdaptedOffers(response.data);
        dispatch(ActionCreator.loadOffersNearby(adapatedData));
      });
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.POST_REVIEW:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_OFFERS_NEARBY:
      return extend(state, {
        offersNearby: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        isError: action.payload,
      });
    case ActionType.SET_REQUEST_STATUS:
      return extend(state, {
        isBusy: action.payload
      });
  }

  return state;
};
