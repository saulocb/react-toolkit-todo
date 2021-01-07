import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { addAlert } from "../../shared/alert/alertsReducer";
import { BouncerApi } from "../../shared/Api/BouncerApi";
import IAddShiftForm from "./Interfaces/IAddShiftForm";
import IShift from "./Interfaces/IShift";
import {
  addShiftStart,
  addShiftSuccess,
  editShiftStart,
  editShiftSuccess,
  getAllShiftStart,
  getAllShiftSuccess,
  removeShiftStart,
  removeShiftSuccess,
} from "./shiftRecuders";

export const addShift = (formValues: IAddShiftForm, userId?: string) => {
  return async (dispatch: Dispatch) => {
    formValues.userId = userId;
    formValues.creationDate = new Date();
    dispatch(addShiftStart());
    new BouncerApi()
      .postShift$(formValues)
      .then(() => {
        dispatch(
          addAlert({
            id: "",
            header: "Add Shift",
            text: "shift added with success",
            style: "success",
          })
        );
        dispatch(getAllShift());
        dispatch(addShiftSuccess());
      })
      .catch((error) => handleHttpError(error, dispatch, "add"));
  };
};

export const editShift = (shift: IShift) => {
  return async (dispatch: Dispatch) => {
    dispatch(editShiftStart());
    new BouncerApi()
      .putShift$(shift)
      .then(() => {
        dispatch(
          addAlert({
            id: "",
            header: "Edit Shift",
            text: "shift updated",
            style: "success",
          })
        );
        dispatch(getAllShift());
        dispatch(editShiftSuccess());
      })
      .catch((error) => handleHttpError(error, dispatch, "update"));
  };
};

export const deleteShift = (shiftId?: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(removeShiftStart());
    new BouncerApi()
      .removeShift$(shiftId)
      .then(() => {
        dispatch(
          addAlert({
            id: "",
            header: "Remove Shift",
            text: "shift Removed",
            style: "success",
          })
        );
        dispatch(getAllShift());
        dispatch(removeShiftSuccess());
      })
      .catch((error) => handleHttpError(error, dispatch, "delete"));
  };
};

export const getAllShift = (): Action | any => {
  return async (dispatch: Dispatch) => {
    dispatch(getAllShiftStart());
    new BouncerApi()
      .getALlShift$()
      .then((response) => {
        dispatch(getAllShiftSuccess(response.data));
      })
      .catch((error) => handleHttpError(error, dispatch, "gel shifts"));
  };
};

export const handleHttpError = (error, dispatch, action: string) => {
  let errorMessage = "";
  if (error.response !== undefined && error.response.data.error !== undefined) {
    errorMessage = error.response.data.error.message;
  } else {
    errorMessage = `Something happened Could not ${action} the shift `;
  }
  dispatch(
    addAlert({
      id: "",
      header: "Add Shift",
      text: errorMessage,
      style: "danger",
    })
  );
};
