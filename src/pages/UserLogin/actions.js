/*
 * Login Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { push } from 'react-router-redux';
import { login } from '../../api/user_backend';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESULT,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
    isLoading: true,
  };
};



const userLoginResult = () => {
  return {
    type: USER_LOGIN_RESULT,
    isLoading: false,
  };
};

export const userLogin = (params) => {
  return async (dispatch) => {
      dispatch(userLoginRequest());
      const response = await login(params);

      dispatch(userLoginResult());

      if (response.status === 200) {
        setAuthority('user');
        reloadAuthorized();
        dispatch(push('/'));
      }
      return response; 
  };
};
