import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupFormState } from "./signupFormSlice.types";

const signupFormSlice = createSlice({
  name: "signupForm",
  initialState: {
    politicPreferences: [],
    employment: null,
    educationSubject: null,
    educationLevel: null,
    height: null,
    name: null,
    gender: null,
    age: null,
    location: null,
    religiousPreferences: [],
  },
  reducers: {
    setNameState(state: SignupFormState, action: PayloadAction<string>) {
      return {
        ...state,
        name: action.payload,
      };
    },
    setAgeState(state: SignupFormState, action: PayloadAction<number>) {
      return {
        ...state,
        age: action.payload,
      };
    },
    setGenderState(state: SignupFormState, action: PayloadAction<string>) {
      return {
        ...state,
        gender: action.payload,
      };
    },
    setHeightState(state: SignupFormState, action: PayloadAction<number>) {
      return {
        ...state,
        height: action.payload,
      };
    },
    setPoliticPreferencesState(
      state: SignupFormState,
      action: PayloadAction<string[]>
    ) {
      return {
        ...state,
        politicPreferences: action.payload,
      };
    },
    setEmploymentState(state: SignupFormState, action: PayloadAction<string>) {
      return {
        ...state,
        employment: action.payload,
      };
    },
    setEducationSubjectState(
      state: SignupFormState,
      action: PayloadAction<string>
    ) {
      return {
        ...state,
        educationSubject: action.payload,
      };
    },
    setEducationLevelState(
      state: SignupFormState,
      action: PayloadAction<string>
    ) {
      return {
        ...state,
        educationLevel: action.payload,
      };
    },
    setLocationState(
      state: SignupFormState,
      action: PayloadAction<Record<string, number>>
    ) {
      return {
        ...state,
        location: action.payload,
      };
    },
    setReligiousPrefence(
      state: SignupFormState,
      action: PayloadAction<string>
    ) {
      return {
        ...state,
        religiousPreferences: [action.payload],
      };
    },
  },
});

export const {
  setEducationLevelState,
  setEducationSubjectState,
  setEmploymentState,
  setPoliticPreferencesState,
  setHeightState,
  setNameState,
  setAgeState,
  setLocationState,
  setGenderState,
  setReligiousPrefence,
} = signupFormSlice.actions;

export const signupFormReducer = signupFormSlice.reducer;
