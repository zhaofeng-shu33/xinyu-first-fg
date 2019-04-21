// use localStorage to store the auth key info, which might be sent from server in actual project.
export function getKey() {
  return localStorage.getItem('django-rest-auth-key') || null;
}

export function setKey(new_key) {
  localStorage.setItem('django-rest-auth-key', new_key);
}
export function removeKey() {
  localStorage.removeItem('django-rest-auth-key');
}
