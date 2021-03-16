import { Dispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  setPrimaryButtonState,
  setSecondaryButtonState,
} from "../../redux/slices/layoutSlice";
import {
  ButtonState,
  HeaderButtonState,
  LayoutState,
} from "../../redux/slices/layoutSlice.types";

export function useButtonClickPage(
  dispatch: Dispatch<{
    payload: ButtonState | HeaderButtonState | string;
    type: string;
  }>,
  kind: "primary" | "secondary",
  onClickRoute: string
): void {
  const combinedState = useSelector((state: RootState) => state.layout);

  useEffect(() => {
    if (combinedState) {
      const { primaryButtonState, secondaryButtonState } = combinedState;

      if (kind === "primary")
        dispatch(
          setPrimaryButtonState({
            ...primaryButtonState,
            onClickRoute,
          })
        );

      if (kind === "secondary")
        dispatch(
          setSecondaryButtonState({
            ...secondaryButtonState,
            onClickRoute,
          })
        );
    }
  }, [!combinedState]);
}

export default useButtonClickPage;
