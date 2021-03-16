import { ThunkAction, Action } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
