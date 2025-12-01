export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const SET_ERROR = 'SET_ERROR';

export interface LoginAction {
  type: typeof LOGIN;
  payload: { email: string }; 
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface SignupAction {
  type: typeof SIGNUP;
  payload: { email: string }; 
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type AuthActionTypes = LoginAction | LogoutAction | SignupAction | SetErrorAction;
