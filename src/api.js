import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 404
};

export const createAPI = (onUnauthorized, onBadRequest) => {

  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    withCredentials: true,
    timeout: 5000
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    } else if (response.status === Error.BAD_REQUEST) {
      onBadRequest(err);
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
