export interface HeaderButtonState {
  show: boolean;
}

export interface ButtonState {
  text?: string;
  onClickRoute?: string;
  show: boolean;
  color?: string;
}

export interface ThemeState {
  primary: string;
  secondary: string;
}

export interface ProgressBarState {
  show: boolean;
  progress?: number;
}

export interface BackgroundState {
  color?: string;
}

export interface LayoutState {
  disabled?: boolean;
  primaryButtonState?: ButtonState;
  secondaryButtonState?: ButtonState;
  headerButtonState?: HeaderButtonState;
  themeState?: ThemeState;
  progressBarState?: ProgressBarState;
  backgroundState?: BackgroundState;
}

export interface ModalState {
  show: boolean;
  routeName?: string;
}
