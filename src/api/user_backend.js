/**
 * 请求真正的后端
 */
import {LOGIN_ENDPOINT} from './config.js';

export async function getUserProfile() {
    const data = await {
      name: '淘小宝',
      department: '技术部',
      avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
      userid: 10001,
    };
    return { data };
  }
  
  export async function login(params) {
    const { password, username } = params;
    let data = JSON.stringify({username, password});
    let loginConfig =  {
        body: submitStr,
        headers: {
            "Content-Type": "application/json",                  
        },
        method: 'POST',
        credentials: 'include'
    };
    const response = await fetch(LOGIN_URL, loginConfig);
    const json = await response.json();
    if(json.password || json.non_field_errors){
        data = {
            status: 200,
            statusText: '用户名或密码错误',
            currentAuthority: 'guest'
        }
    }  
    else if(json.key){
        data = {
            status: 200,
            statusText: 'ok',
            currentAuthority: 'user'
        }
    }
    else{
        data = {
            status: 200,
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
    const data = await {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
    return { data };
  }
  