import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageLayout } from "../../redux/slices/layoutSlice";
import { LayoutState } from "../../redux/slices/layoutSlice.types";

export function usePageLayout(pageLayout: LayoutState): void {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageLayout(pageLayout));
  }, []);
}

export default usePageLayout;
