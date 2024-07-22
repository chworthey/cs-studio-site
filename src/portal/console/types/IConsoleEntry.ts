import { IClonable } from "../../shared/IClonable";
import { ConsoleEntryType } from "./ConsoleEntryType";

export interface IConsoleEntry extends IClonable<IConsoleEntry> {
  type: ConsoleEntryType;
  id: string;
  requirementId: string | undefined;
  isFocusable: boolean;
};
