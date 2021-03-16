import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./appSlice.types";

const appSlice = createSlice({
  name: "layout",
  initialState: {
    phoneNumber: null,
    faceApiLoaded: false,
    chosenUserId: null,
  } as AppState,
  reducers: {
    setPhoneNumberState(state: AppState, action: PayloadAction<string>) {
      return {
        ...state,
        phoneNumber: action.payload,
      };
    },
    setFaceApiLoaded(state: AppState, action: PayloadAction<boolean>) {
      return {
        ...state,
        faceApiLoaded: action.payload,
      };
    },
    setChosenUserIdState(state: AppState, action: PayloadAction<string>) {
      return {
        ...state,
        chosenUserId: action.payload,
      };
    },
  },
});

export const {
  setPhoneNumberState,
  setFaceApiLoaded,
  setChosenUserIdState,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
