import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

export interface IConsoleEntryTitleOutput extends IConsoleEntry {
  type: ConsoleEntryType.TitleOutput;
  textParts: string[];
  accessibilityLabel: string;
}

export interface IConsoleEntryStateTitleOutput extends IConsoleEntryState {
  type: ConsoleEntryType.TitleOutput;
}

export function CreateTitleOutput(id: string, textParts: string[], accessibilityLabel: string, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryTitleOutput = { 
    type: ConsoleEntryType.TitleOutput,
    id: id,
    textParts: textParts,
    accessibilityLabel: accessibilityLabel,
    requirement: requirement,
    isFocusable: false,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function CreateTitleOutputState(id: string) {
  const rv: IConsoleEntryStateTitleOutput = {
    id: id,
    type: ConsoleEntryType.TitleOutput,
    visible: true,
    isFocused: false,
    Clone: function() { return {...this}; }
  };
  return rv;
}
