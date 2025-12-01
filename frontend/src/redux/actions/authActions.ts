import { LOGIN, LOGOUT, SIGNUP, SET_ERROR } from "../../types/authType";

export const login = (userData: { email: string }) => ({ type: LOGIN, payload: userData });
export const logout = () => ({ type: LOGOUT });
export const signup = (userData: { email: string }) => ({ type: SIGNUP, payload: userData });
export const setError = (error: string) => ({ type: SET_ERROR, payload: error });
