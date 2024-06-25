import { IClonable } from "../shared/IClonable";
import { ConsoleEntryType } from "./ConsoleEntryType";
import { IRequirement } from "./IRequirement";

export interface IConsoleEntry extends IClonable<IConsoleEntry> {
  type: ConsoleEntryType;
  id: string;
  requirement: IRequirement | undefined;
  isFocusable: boolean;
};
