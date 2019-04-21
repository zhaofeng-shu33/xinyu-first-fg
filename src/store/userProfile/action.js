/*
 *
 * profile actions
 *
 */

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './constants';
import { getUserProfile, updateUserProfile } from '../../api/user_backend';

const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST,
    isLoading: true,
  };
};

const userProfileSuccess = (payload) => {
  return {
    type: USER_PROFILE_SUCCESS,
    isLoading: false,
    payload,
  };
};

const userProfileFailure = (payload) => {
  return {
    type: USER_PROFILE_FAILURE,
    isLoading: false,
    payload,
  };
};

export const userProfile = (params = null) => {
  return async (dispatch) => {
    dispatch(userProfileRequest());
    try {
      let response = {};
      if (params) {
        response = await updateUserProfile(params);
      }
      else {
        response = await getUserProfile();
      }
      dispatch(userProfileSuccess(response.data));
    } catch (error) {
      dispatch(userProfileFailure(error));
    }
  };
};
