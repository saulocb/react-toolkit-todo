import history from "../../app/history";
import { Dispatch } from "@reduxjs/toolkit";
import ILoginForm from "./Interfaces/IAuthForm";
import { BouncerApi } from "../../shared/Api/BouncerApi";
import { LocalStorageService } from "../../shared/services/localStorage";
import ISignUpForm from "./Interfaces/ISignUpForm";
import { loginFail, loginStart, loginSuccess, signUpStart, signUpSuccess } from "./authReducer";
import { addAlert } from "../../shared/alert/alertsReducer";

// ************  async functions **************

export const signin = (formValues: ILoginForm) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginStart());
    new BouncerApi()
      .postLogin(formValues)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        LocalStorageService.setItem("token", response.data.id);
        LocalStorageService.setItem("userId", response.data.userId);
        history.push("/home");
      })
      .catch((error) => handleHttpError(error, dispatch, "login"));
  };
};

export const signUp = (formValues: ISignUpForm) => {
  return async (dispatch: Dispatch) => {
    dispatch(signUpStart());
    new BouncerApi()
      .postUser$(formValues)
      .then((response) => {
        LocalStorageService.setItem("userId", response.data.id);
        dispatch(signUpSuccess(response.data));
        dispatch(
          addAlert({
            id: "",
            header: "SignUp",
            text: "User created with success",
            style: "success",
          })
        );
      })
      .catch((error) => handleHttpError(error, dispatch, "sign up"));
  };
};

export const handleHttpError = (error, dispatch, action: string) => {
  let errorMessage = "";
  if (error.response !== undefined && error.response.data.error !== undefined) {
    errorMessage = error.response.data.error.message;
  } else {
    errorMessage = `Something happened Could not ${action}`;
  }
  dispatch(loginFail({ error: errorMessage }));
};
