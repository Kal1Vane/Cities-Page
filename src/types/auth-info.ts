import { Token } from '../services/token';

export type AuthInfo = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: Token,
};
