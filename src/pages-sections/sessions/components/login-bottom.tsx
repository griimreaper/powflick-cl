import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import useFlag from "hooks/useFlag";
import { RegisterPageView } from "../page-view";

export default function LoginBottom() {
  const [isRendering, setIsRendering] = useFlag(false);

  const toggleRendering = () => {
    setIsRendering(!isRendering);
  };

  return (
    <Fragment>
      {/* DON'T HAVE ACCOUNT AREA */}
      <FlexRowCenter gap={1} my={3}>
        Don&apos;t have account?
        <BoxLink
          title="Register"
          onClick={() => {
            setIsRendering(true);
          }}
        />
      </FlexRowCenter>
      {isRendering && (
        <RegisterPageView
          rendering={isRendering}
          setIsRendering={toggleRendering}
        />
      )}

      {/* FORGET YOUR PASSWORD AREA */}
      <FlexBox
        gap={1}
        py={2}
        borderRadius={1}
        justifyContent="center"
        bgcolor="grey.200"
      >
        Forgot your password?
        <BoxLink title="Reset It" href="/reset-password" />
      </FlexBox>
    </Fragment>
  );
}
