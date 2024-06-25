import { IConsoleEntry } from "./IConsoleEntry";
import { IConsoleEntryState } from "./IConsoleEntryState";

export interface IConsoleGraphNode {
  order: number;
  entry: IConsoleEntry;
  state: IConsoleEntryState;
};
