import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import useFlag from "hooks/useFlag";
import { RegisterPageView } from "../page-view";
import ResetPassword from "../page-view/reset-password";

export default function LoginBottom() {
  const [isRenderingRegister, setIsRenderingRegister] = useFlag(false);
  const [isRenderingResetPassword, setIsRenderingResetPassword] = useFlag(false);

  const toggleRendering = () => {
    setIsRenderingRegister(!isRenderingRegister);
  };

  const toggleResetPassword = () => {
    setIsRenderingResetPassword(!isRenderingResetPassword);
  };

  return (
    <Fragment>
      {/* DON'T HAVE ACCOUNT AREA */}
      <FlexRowCenter gap={1} my={3}>
        Don&apos;t have account?
        <BoxLink
          title="Register"
          onClick={() => {
            setIsRenderingRegister(true);
          }}
        />
      </FlexRowCenter>
      {isRenderingRegister && (
        <RegisterPageView
          rendering={isRenderingRegister}
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
        <BoxLink title="Reset It" onClick={() => {
          setIsRenderingResetPassword(true);
        }}/>
      </FlexBox>

      {isRenderingResetPassword && (
        <ResetPassword
          rendering={isRenderingResetPassword}
          setIsRendering={toggleResetPassword}
        />
      )}
    </Fragment>
  );
}
