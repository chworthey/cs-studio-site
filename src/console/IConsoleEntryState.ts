import { ConsoleEntryType } from "./ConsoleEntryType";

export interface IConsoleEntryState {
  id: string;
  type: ConsoleEntryType;
  visible: boolean;
  isFocused: boolean;
};

export function EntrySetFocus(state: IConsoleEntryState, focus: boolean) {
  state.isFocused = focus;
}
