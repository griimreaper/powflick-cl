import { DataStructure } from "models/types";

export interface Props {
  open?: boolean;
  position?: "absolute" | "relative";
  data: DataStructure["navbar"]
}
