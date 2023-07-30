export const REQUEST_USER_KEY = 'user';

export interface RequestUser {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
