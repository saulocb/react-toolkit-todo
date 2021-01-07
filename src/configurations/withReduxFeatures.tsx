import { compose } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import AuthReducer from "../features/auth/authReducer";
import withProvider from "./withProvider";
import { reducer as formReducer } from "redux-form";
import AuthState from "../features/auth/states";
import ShiftReducer from "../features/shift/shiftRecuders";
import ShiftState from "../features/shift/shiftState";
import AlertReducer from "../shared/alert/alertsReducer";
import AlertState from "../shared/alert/IAlertState";
import { configureStore } from "@reduxjs/toolkit";
import { LocalStorageService } from "../shared/services/localStorage";

function saveToLocalStorage(state) {
  try {
    if(LocalStorageService.getItem("token")){
      const serializedState = JSON.stringify(state);
      LocalStorageService.setItem("state", serializedState)
    }
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState =  LocalStorageService.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

/**
 * Create root reducer, containing
 * all features of the application
 */

export interface FormState {
  addShift: any;
}

export interface ApplicationState {
  authentication: AuthState;
  shift: ShiftState;
  arlets: AlertState;
  form: FormState;
}

const rootReducer = combineReducers({
  authentication: AuthReducer,
  shift: ShiftReducer,
  form: formReducer,
  arlets: AlertReducer,
});

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/* eslint-disable no-underscore-dangle */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
console.log("composeEnhancers", composeEnhancers);
/* eslint-enable */

/** Create Redux store with root reducer and middleware included */
// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(reduxThunk))
// );

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
store.subscribe(() => saveToLocalStorage(store.getState()));

/**
 * provide a list of all reducer
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = (selector: (state: AppState) => AppState) =>
  useSelector(selector);


/**
 * Create HOC, which wraps given Component with Redux Provider
 */

export default withProvider({ store, Provider });
