import { IClonable } from "../shared/IClonable";
import { ConsoleEntryType } from "./ConsoleEntryType";

export interface IConsoleEntryState extends IClonable<IConsoleEntryState> {
  id: string;
  type: ConsoleEntryType;
  visible: boolean;
  isFocused: boolean;
};
