import {
  IconBrandCodesandbox,
  IconCe,
  IconHandOff,
  IconLockAccess,
  IconSquareCheck,
} from "@tabler/icons";
import { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { BaseContainer } from "../../src/components/Containers";
import { TitleDescription } from "../../src/components/TitleDescription";
import { Description } from "../../src/components/Typography";
import { SIGNUP_PROGRESS_STEP } from "../../src/helpers/constants";
import { colors } from "../../src/helpers/themes";
import { usePageLayout } from "../../src/hooks/layout/usePageLayout";
import { RootState } from "../../src/redux/rootReducer";
import { LayoutState } from "../../src/redux/slices/layoutSlice.types";

const pageLayout: LayoutState = {
  primaryButtonState: {
    show: true,
    text: "Accept",
    onClickRoute: "/signup/social_networks",
  },
  secondaryButtonState: {
    show: true,
    text: "Terms & Conditions",
    onClickRoute: "https://feelja.com/terms",
  },
  progressBarState: {
    show: true,
    progress: SIGNUP_PROGRESS_STEP * 0,
  },
};

interface ConsentBadgeProps {
  style?: React.CSSProperties;
  icon: ReactNode;
}

function ConsentBadge(
  props: PropsWithChildren<ConsentBadgeProps>
): ReactElement {
  const { children, icon, style } = props;

  return (
    <BaseContainer
      style={{
        ...style,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon}
      <Description
        style={{ marginLeft: "10px", maxWidth: "75%", textAlign: "left" }}
      >
        {children}
      </Description>
    </BaseContainer>
  );
}

export function ConsentPage(): ReactElement {
  usePageLayout(pageLayout);

  const { signupForm } = useSelector((state: RootState) => state);

  const router = useRouter();

  return (
    <>
      <TitleDescription
        title="Privacy statement"
        description="To understand you well, Feelja needs to see some of your data"
      />
      <BaseContainer
        style={{
          justifyContent: "space-evenly",
          flexDirection: "column",
          height: "60%",
        }}
      >
        <ConsentBadge icon={<IconHandOff style={{ color: colors.primary }} />}>
          Your personal data will never be sold to anyone, including our
          business partners
        </ConsentBadge>
        <ConsentBadge icon={<IconCe style={{ color: colors.primary }} />}>
          Your data is safely stored and encrypted in accordance to European
          GDPR standards
        </ConsentBadge>
        <ConsentBadge
          icon={<IconLockAccess style={{ color: colors.primary }} />}
        >
          Look for this icon: this data will can only be seen by you
        </ConsentBadge>
      </BaseContainer>
    </>
  );
}

export default ConsentPage;
