import { ConsoleEntryType } from "./ConsoleEntryType";

export interface IConsoleEntryState {
  id: string;
  type: ConsoleEntryType;
  visible: boolean;
  isFocused: boolean;
};
