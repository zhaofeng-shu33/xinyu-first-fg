// 律所列表
import { LAWYER_OFFICE_LIST_URL } from './config';
export async function getOffice() {
  const response = await fetch(LAWYER_OFFICE_LIST_URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json(); // a promise object
}
