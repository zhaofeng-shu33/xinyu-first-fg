// 课程认领请求
import { CLASS_URL } from './config';
import { getKey } from './key';
export async function getClassList(page = 1) {
  const response = await fetch(CLASS_URL + '?page=' + page, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json(); // a promise object
}
export async function applyClass(classId) {
  let key = getKey();
  if (key) {
    const response = await fetch(CLASS_URL + `${classId}/`, {
      method: 'PUT',
      headers: {
        Authorization: 'Token ' + key
      }
    });
    return response.json();
  }
  else {
    return { detail: '请先登录再认领班级'};
  }
}
