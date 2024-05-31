import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

export interface IConsoleEntryTitleOutput extends IConsoleEntry {
  type: ConsoleEntryType.TitleOutput;
  textParts: string[];
}

export interface IConsoleEntryStateTitleOutput extends IConsoleEntryState {
  type: ConsoleEntryType.TitleOutput;
}

export function CreateTitleOutput(id: string, textParts: string[], requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryTitleOutput = { 
    type: ConsoleEntryType.TitleOutput,
    id: id,
    textParts: textParts,
    requirement: requirement
  };

  return newEntry;
};

export function CreateTitleOutputState(id: string) {
  const rv: IConsoleEntryStateTitleOutput = {
    id: id,
    type: ConsoleEntryType.TitleOutput,
    visible: true
  };
  return rv;
}
