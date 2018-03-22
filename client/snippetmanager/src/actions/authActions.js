/* eslint-disable import/prefer-default-export,arrow-parens,no-use-before-define */
import axios from 'axios';

import { LOGIN_USER_PENDING, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS } from './actionTypes';

export const loginUser = response => dispatch => {
  if (!(response && response.code)) {
    dispatch(loginUserFailed(null));
    return;
  }
  dispatch(loginUserPending());
  axios.post('http://localhost:5000/users/login', response)
    .then((res) => {
      // TODO: set auth header for axios default
      dispatch(loginUserSuccess(res.data));
    }).catch(err => dispatch(loginUserFailed(err)));
};


const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

const loginUserPending = () => ({
  type: LOGIN_USER_PENDING,
});

export const loginUserFailed = (err) => ({
  type: LOGIN_USER_FAILED,
  error: err,
});