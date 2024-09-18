import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';
import { apiLogin } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';

export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    try {
    const response = await apiLogin(payload);
    if (response.success) {
      const { data: { accessToken, user } } = response;
      const { email } = user;

      localStorage.setItem('t', accessToken);
      localStorage.setItem('email', email);
      dispatch(
        setUserItem({logged: true, email}),
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {

      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    }
};
