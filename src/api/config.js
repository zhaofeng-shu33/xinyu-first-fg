let API_ENDPOINT_INNER = 'http://leidenschaft.cn/django/';
if (process.env.NODE_ENV === `development`) {
  API_ENDPOINT_INNER = 'http://127.0.0.1:8000/';
}
export const API_ENDPOINT = API_ENDPOINT_INNER;

// 用户管理相关
export const LOGIN_URL = API_ENDPOINT + 'rest-auth/login/';
export const PROFILE_URL = API_ENDPOINT + 'xinyu/lawyer/';
export const LOGOUT_URL = API_ENDPOINT + 'rest-auth/logout/';
export const REGISTRATION_URL = API_ENDPOINT + 'rest-auth/registration/';
export const PASSWORD_CHANGE_URL = API_ENDPOINT + 'rest-auth/password/change/';

// 课程认领相关
export const CLASS_URL = API_ENDPOINT + 'xinyu/class/';
