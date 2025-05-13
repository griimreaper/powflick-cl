import { PropsWithChildren } from "react";
import PageStepper from "./page-stepper";

export default function Layout({ children }: PropsWithChildren) {
  return <div style={{ backgroundColor: "white" }}>
    <PageStepper>{children}</PageStepper>;
  </div>

}
