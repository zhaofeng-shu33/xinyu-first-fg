// 课程认领请求
import { CLASS_LIST_URL } from './config';
export async function getClassList() {
  const response = await fetch(CLASS_LIST_URL);
  return response.json(); // a promise object
}
