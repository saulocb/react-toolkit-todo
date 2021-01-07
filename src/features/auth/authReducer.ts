import AuthState from "./states";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import IAuthentication from "./Interfaces/IAuthentication";
import IUser from "./Interfaces/IUser";
import { LocalStorageService } from "../../shared/services/localStorage";
import { resetShift } from "../shift/shiftRecuders";

const initialState: AuthState = {
  error: null,
  isSignedIn: false,
  isFetching: false
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, { payload }: PayloadAction<IAuthentication>) => {
      state.auth = payload;
      state.isFetching = false;
      state.isSignedIn = true;
      state.error = null;
    },
    loginFail: (state, { payload }: PayloadAction<{ error: string }>) => {
      state.isFetching = false;
      state.error = payload.error;
    },
    signUpStart: (state) => {
      state.isFetching = true;
    },
    signUpSuccess: (state, { payload }: PayloadAction<IUser>) => {
      state.isFetching = false;
      state.error = null;
      state.user = payload;
    },
    signUpFail: (state, { payload }: PayloadAction<{ error: string }>) => {
      state.isFetching = false;
      state.error = payload.error;
    },
    resetAuth: (state) => {
      state.isSignedIn =  false
      state = initialState;
    },
    cleanError: (state) => {
      
      state.error = null;
    },
  },
});

export const logOut = () => {
  return async (dispatch: Dispatch) => {
    LocalStorageService.removeItem("token");
    LocalStorageService.removeItem("state");
    dispatch(resetShift());
    dispatch(resetAuth());
  };
};

export const {
  loginStart,
  loginSuccess,
  loginFail,
  signUpStart,
  signUpSuccess,
  signUpFail,
  resetAuth,
  cleanError,
} = authSlice.actions;

export default authSlice.reducer;
