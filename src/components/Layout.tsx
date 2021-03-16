import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { colors, defaultTheme } from "../helpers/themes";
import { RootState } from "../redux/rootReducer";
import {
  withSlideInTransition,
  withSwitchLeftTransition,
  withSwitchRightTransition,
} from "./Animated";
import { AppHeader } from "./AppHeader";
import {
  ButtonsContainer,
  HeaderContainer,
  MainContainer,
  PageContainer,
} from "./Containers";
import { MainButton as MAIN_BUTTON, MainButtonProps } from "./MainButton";
import { ProgressBar } from "./ProgressBar";

const MainButton = forwardRef((props: MainButtonProps, ref) => {
  return <MAIN_BUTTON {...props} />;
});

export function Layout(props: PropsWithChildren<any>): ReactElement {
  const { children } = props;

  const router = useRouter();

  const currentLayoutState = useSelector(
    (state: RootState) => state.layout || {}
  );

  const {
    themeState: theme = defaultTheme,
    primaryButtonState,
    secondaryButtonState,
    headerButtonState,
    progressBarState,
    disabled,
    backgroundState,
  } = currentLayoutState;

  const pathName = router?.asPath;

  const [nextPageAnimation, setNextPageAnimation] = useState(
    () => withSlideInTransition
  );

  return (
    <ThemeProvider theme={theme}>
      <PageContainer
        style={{
          pointerEvents: "all",
          background: backgroundState?.color || theme.secondary,
          alignItems: disabled ? "center" : "normal",
        }}
      >
        {disabled ? (
          <AnimatePresence exitBeforeEnter>
            {nextPageAnimation(children, `${pathName}anim`)}
          </AnimatePresence>
        ) : (
          <>
            <HeaderContainer>
              <AnimatePresence exitBeforeEnter>
                {progressBarState?.show && (
                  <ProgressBar progress={progressBarState.progress} />
                )}
                {headerButtonState?.show && (
                  <AppHeader
                    onToggle={(option) => {
                      setNextPageAnimation(
                        {
                          0: () => withSwitchLeftTransition,
                          1: () => withSwitchRightTransition,
                        }[option]
                      );

                      if (option === 0) {
                        router.back();
                      } else if (option === 1) {
                        router.push("/main/profile");
                      }
                    }}
                  />
                )}
              </AnimatePresence>
            </HeaderContainer>
            <MainContainer>
              <AnimatePresence exitBeforeEnter>
                {nextPageAnimation(children, `${pathName}anim`)}
              </AnimatePresence>
            </MainContainer>
            <ButtonsContainer>
              <Link href={primaryButtonState?.onClickRoute || "#"} passHref>
                <MainButton
                  innerKey={`${pathName}-primaryButton`}
                  text={primaryButtonState?.text}
                  animated={primaryButtonState?.show}
                  style={{
                    display: primaryButtonState?.show ? "block" : "none",
                    marginBottom: "4px",
                    background: primaryButtonState?.color || colors.primary,
                    borderColor: primaryButtonState?.color || colors.primary,
                  }}
                />
              </Link>
              <Link href={secondaryButtonState?.onClickRoute || "#"} passHref>
                <MainButton
                  innerKey={`${pathName}-secondaryButton`}
                  secondary
                  text={secondaryButtonState?.text}
                  animated={secondaryButtonState?.show}
                  style={{
                    display: secondaryButtonState?.show ? "block" : "none",
                    marginTop: "4px",
                  }}
                />
              </Link>
            </ButtonsContainer>
          </>
        )}
      </PageContainer>
    </ThemeProvider>
  );
}

export default Layout;
