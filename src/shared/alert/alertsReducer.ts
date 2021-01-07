import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import IAlertState from "./IAlertState";
import IAlert from "./interface/IAlert";

class Alert implements IAlert {
  id = "";
  header = "";
  text = "";
  style = "";
}

const initialState: IAlertState = {
  arlets: new Array<Alert>(),
};

const alertSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addAlert: (state, { payload }: PayloadAction<IAlert>) => {
      payload.id = uuidv4();
      state.arlets.push(payload);
    },
    removeAlert: (state, { payload }: PayloadAction<{ id?: string }>) => {
      state.arlets.forEach( (item, index) => {
        if(item.id === payload.id) state.arlets.splice(index,1);
      });
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
