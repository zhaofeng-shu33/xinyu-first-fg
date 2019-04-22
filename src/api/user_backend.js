/**
 * 请求真正的后端
 */
import {
  LOGIN_URL, PROFILE_URL,
  LOGOUT_URL, REGISTRATION_URL,
  PASSWORD_CHANGE_URL
} from './config.js';
import { getKey, setKey, removeKey } from './key.js';
export async function getUserProfile() {
  let data = {};
  let key = getKey();
  if (key) {
    const response = await fetch(PROFILE_URL,
      {
        headers: {
          Authorization: 'Token ' + key
        }
      });
    const json = await response.json();
    return {data: json}
  }
  // avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png'
  return { data };
  }
export async function updateUserProfile(params) {
  let key = getKey();
  let data = {};
  if (key) {
    let data_send = JSON.stringify(params);
    let config = {
      body: data_send,
      method: 'PUT',
      headers: {
        Authorization: 'Token ' + key,
        "Content-Type": "application/json",
      }
    };
    const response = await fetch(PROFILE_URL, config);
    const json = await response.json();
    return {data: json}
  }
  return { data };
} 
export async function login(params) {
    let data_send = JSON.stringify(params);
    let data = {};
    let config =  {
        body: data_send,
        headers: {
            "Content-Type": "application/json",                  
        },
        method: 'POST'
    };
    const response = await fetch(LOGIN_URL, config);
    const json = await response.json();
    if(json.password || json.non_field_errors){
        data = await {
            status: 401,
            statusText: '用户名或密码错误',
            currentAuthority: 'guest'
        }
    }  
    else if (json.key) {
        setKey(json.key);
        data = await {
            status: 200,
            statusText: 'ok',
            currentAuthority: 'user'
        }
    }
    else{
        data = await {
            status: 401,
            statusText: '未知错误',
            currentAuthority: 'guest'
        }
    }
    return { data };
}
  
export async function postUserRegister(params) {
  let data_send = JSON.stringify(params);
  let data = {};
  let config = {
    body: data_send,
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST'
  };
  const response = await fetch(REGISTRATION_URL, config);
  const json = await response.json();
  data = {
        status: response.status,
        statusText: json.detail ? json.detail : 'ok',
        currentAuthority: 'user',
  };
    return { data };
}

export async function postUserLogout() {
  let data = {}
  let key = getKey()
  if (key) {
    const response = await fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + key
      }
    });
    if (response.status == 200) {
      removeKey();
    }
     data = await {
      status: response.status,
      statusText: response.statusText,
      currentAuthority: 'guest',
    };
  }
  else {
     data = await {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
    return { data };
}

export async function passwordChange(params) {
  let key = getKey();
  if (key) {
    let data_send = JSON.stringify(params);
    let config = {
      body: data_send,
      method: 'POST',
      headers: {
        Authorization: 'Token ' + key,
        "Content-Type": "application/json",
      }
    };
    const response = await fetch(PASSWORD_CHANGE_URL, config);
    const json = await response.json();
    return {
      status: response.status,
      data: json
    }
  }
  return data;
} 
