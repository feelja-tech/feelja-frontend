import { ThemeState } from "../redux/slices/layoutSlice.types";

export const colors = {
  primary: "#F66",
  secondary: "#ffffff",
  black: "#8c8c8c",
};

export const defaultTheme: ThemeState = {
  primary: colors.primary,
  secondary: colors.secondary,
};

export const invertedTheme: ThemeState = {
  primary: defaultTheme.secondary,
  secondary: defaultTheme.primary,
};

export const hex2rgba = (hex: string, alpha = 1): string => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
