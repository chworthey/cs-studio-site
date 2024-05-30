import { IConsoleEntry } from "./IConsoleEntry";
import { IConsoleEntryState } from "./IConsoleEntryState";

export interface IConsoleGraphNode {
  entry: IConsoleEntry;
  state: IConsoleEntryState;
};
