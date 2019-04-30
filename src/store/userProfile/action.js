/*
 *
 * profile actions
 *
 */

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_SHOULD_UPDATE,
} from './constants';
import { getUserProfile, updateUserProfile } from '../../api/user_backend';
import { Message } from '@alifd/next';

export const userProfileUpdate = () => {
  return {
    type: USER_PROFILE_SHOULD_UPDATE
  }
}
export const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST,
    isLoading: true,
  };
};

export const userProfileSuccess = (payload) => {
  return {
    type: USER_PROFILE_SUCCESS,
    isLoading: false,
    payload,
  };
};

export const userProfileFailure = (payload) => {
  return {
    type: USER_PROFILE_FAILURE,
    isLoading: false,
    payload,
  };
};

export const userProfile = () => {
  return async (dispatch) => {
    dispatch(userProfileRequest());
    try {
      let response = {};
        response = await getUserProfile();

      dispatch(userProfileSuccess(response.data));
    } catch (error) {
      dispatch(userProfileFailure(error));
    }
  };
};

export const userProfilePut = (params) => {
  return async (dispatch) => {
    dispatch(userProfileRequest());
    try {
        let response = {};
        response = await updateUserProfile(params);
        Message.success('更新成功');
        dispatch(userProfileSuccess(response.data));
    } catch (error) {
      dispatch(userProfileFailure(error));
    }
  };
};
