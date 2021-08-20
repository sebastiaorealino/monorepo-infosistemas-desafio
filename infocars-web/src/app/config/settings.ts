import { environment } from 'src/environments/environment';

export const BASE_URL = environment.base_url;
export const USER_URL = `${BASE_URL}/user`;
export const AUTHENTICATE_URL = `${USER_URL}/authenticate`;
export const CAR_URL = `${BASE_URL}/car`;


