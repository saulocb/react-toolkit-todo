import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IShift from "./Interfaces/IShift";
import ShiftState from "./shiftState";

const initialState: ShiftState = {
  myShifts: [],
  error: null,
  isSignedIn: false,
  isFetching: false,
  selectedShift: null
};

const shiftSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addShiftStart: (state) => {
      state.isFetching = true;
    },
    addShiftSuccess: (state) => {
      state.isFetching = false
      state.error = null
    },
    editShiftStart: (state) => {
      state.isFetching = true;
    },
    editShiftSuccess: (state) => {
      state.isFetching = false;
      state.error = null;
    },
    removeShiftStart: (state) => {
      state.isFetching = true;
    },
    removeShiftSuccess: (state) => {
      state.isFetching = false;
      state.error = null;
    },
    getAllShiftStart: (state) => {
      state.isFetching = true;
    },
    getAllShiftSuccess: (state, { payload }: PayloadAction<IShift[]>) => {
      state.isFetching = false;
      state.error = null;
      state.myShifts = payload;
    },
    resetShift: (state) => {
      state.selectedShift =  null
    },
    selectShift: (state, { payload }: PayloadAction<IShift>) => {
      state.selectedShift = payload;
    },
  },
});

export const {
  addShiftStart,
  addShiftSuccess,
  editShiftStart,
  editShiftSuccess,
  removeShiftStart,
  removeShiftSuccess,
  getAllShiftStart,
  getAllShiftSuccess,
  selectShift,
  resetShift
} = shiftSlice.actions;

export default shiftSlice.reducer;
