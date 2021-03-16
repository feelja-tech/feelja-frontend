import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { colors, defaultTheme } from "../../helpers/themes";
import {
  BackgroundState,
  ButtonState,
  HeaderButtonState,
  LayoutState,
  ProgressBarState,
  ThemeState,
} from "./layoutSlice.types";

const layoutSlice = createSlice({
  name: "layout",
  initialState: null as LayoutState,
  reducers: {
    setBackgroundState(
      state: LayoutState,
      action: PayloadAction<BackgroundState>
    ) {
      return {
        ...state,
        backgroundState: action.payload,
      };
    },
    setPrimaryButtonState(
      state: LayoutState,
      action: PayloadAction<ButtonState>
    ) {
      return {
        ...state,
        primaryButtonState: action.payload,
      };
    },
    setSecondaryButtonState(
      state: LayoutState,
      action: PayloadAction<ButtonState>
    ) {
      return {
        ...state,
        secondaryButtonState: action.payload,
      };
    },
    setHeaderButtonState(
      state: LayoutState,
      action: PayloadAction<HeaderButtonState>
    ) {
      return {
        ...state,
        headerButtonState: action.payload,
      };
    },
    setMainComponentName(state: LayoutState, action: PayloadAction<string>) {
      return {
        ...state,
        routeName: action.payload,
      };
    },

    setThemeState(state: LayoutState, action: PayloadAction<ThemeState>) {
      return {
        ...state,
        themeState: action.payload,
      };
    },
    setProgressBarState(
      state: LayoutState,
      action: PayloadAction<ProgressBarState>
    ) {
      return {
        ...state,
        progressBarState: action.payload,
      };
    },
    setDisabledState(state: LayoutState, action: PayloadAction<boolean>) {
      return {
        ...state,
        disabled: action.payload,
      };
    },
    setPageLayout(state: LayoutState, action: PayloadAction<LayoutState>) {
      return {
        primaryButtonState: action.payload.primaryButtonState || {
          show: false,
        },
        secondaryButtonState: action.payload.secondaryButtonState || {
          show: false,
        },
        headerButtonState: action.payload.headerButtonState || {
          show: false,
        },
        themeState: action.payload.themeState || defaultTheme,
        progressBarState: action.payload.progressBarState || {
          show: false,
        },
        backgroundState: action.payload.backgroundState,
        disabled: action.payload.disabled,
      };
    },
  },
});

export const {
  setPrimaryButtonState,
  setHeaderButtonState,
  setMainComponentName,
  setSecondaryButtonState,
  setThemeState,
  setPageLayout,
  setProgressBarState,
  setDisabledState,
  setBackgroundState,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
