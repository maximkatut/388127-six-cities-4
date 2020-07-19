import {ActionType} from '../../actions/types';
import {ActionCreator} from '../../actions/user-actions';
import {extend} from '../../utils';
import {Operation as DataOperation} from '../data/data-reducer';
import history from '../../history';
import {AppRoute} from '../../const';

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: ``
};

export const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((res) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUser(res.data));
        dispatch(DataOperation.loadFavorites());
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((res) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUser(res.data));
        dispatch(DataOperation.loadFavorites());
        history.push(`${AppRoute.ROOT}`);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.GET_USER:
      return extend(state, {
        user: action.payload,
      });
  }

  return state;
};

export default reducer;
