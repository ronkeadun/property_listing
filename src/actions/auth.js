import axios from "axios";
import { setAlert } from "./alert";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://178.62.4.54/api/token",
      // "http://localhost:8000/api/token",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Authenticated Successfully", "success"));
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Error Authenticating", "error"));
  }
};

export const signup = ({ name, email, password, password2 }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, password2 });
  try {
    const res = await axios.post(
      "http://178.62.4.54/api/accounts/signup",
      // "http://localhost:8000/api/accounts/signup",
      body,
      config
    );
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(login(email, password));
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    dispatch(setAlert("Error Authenticating", "error"));
  }
};

export const logout = () => (dispatch) => {
  dispatch(setAlert("Logout Successfully", "success"));
  dispatch({ type: LOGOUT });
};
