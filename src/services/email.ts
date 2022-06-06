const AUTH_EMAIL_KEY_NAME = 'email';

export type Email = string;

export const getEmail = (): Email => {
  const token = localStorage.getItem(AUTH_EMAIL_KEY_NAME);
  return token ?? '';
};

export const saveEmail = (token: Email):void => {
  localStorage.setItem(AUTH_EMAIL_KEY_NAME,token);
};

export const dropEmail = ():void => {
  localStorage.removeItem(AUTH_EMAIL_KEY_NAME);
};
