import { ConsoleEntryType } from "./ConsoleEntryType";
import { IRequirement } from "./IRequirement";

export interface IConsoleEntry {
  type: ConsoleEntryType;
  id: string;
  requirement: IRequirement | undefined;
};
