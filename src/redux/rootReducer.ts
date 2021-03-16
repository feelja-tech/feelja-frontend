import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { layoutReducer } from "./slices/layoutSlice";
import { signupFormReducer } from "./slices/signupFormSlice";

export const rootReducer = combineReducers({
  layout: layoutReducer,
  signupForm: signupFormReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
