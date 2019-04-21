/**
 * 请求真正的后端
 */
import { LOGIN_URL, PROFILE_URL, LOGOUT_URL } from './config.js';
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
    const response = await fetch(PROFILE_URL,
      {
        body: data_send,
        method: 'PUT',
        headers: {
          Authorization: 'Token ' + key,
          "Content-Type": "application/json",
        }
      });
    const json = await response.json();
    return {data: json}
  }
  return { data };
} 
export async function login(params) {
    const { password, username } = params;
    let data_send = JSON.stringify({username, password});
    let data = {};
    let loginConfig =  {
        body: data_send,
        headers: {
            "Content-Type": "application/json",                  
        },
        method: 'POST',
        credentials: 'include'
    };
    const response = await fetch(LOGIN_URL, loginConfig);
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
  
export async function postUserRegister() {
    const data = await {
        status: 200,
        statusText: 'ok',
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
