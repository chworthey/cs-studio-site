import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

export interface IConsoleEntryOutput extends IConsoleEntry {
  type: ConsoleEntryType.Output;
  text: string;
}

export interface IConsoleEntryStateOutput extends IConsoleEntryState {
  type: ConsoleEntryType.Output;
}

export function CreateOutput(id: string, text: string, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryOutput = { 
    type: ConsoleEntryType.Output,
    id: id,
    text: text,
    requirement: requirement,
    isFocusable: false,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function CreateOutputState(id: string) {
  const rv: IConsoleEntryStateOutput = {
    id: id,
    type: ConsoleEntryType.Output,
    visible: true,
    isFocused: false,
    Clone: function() { return {...this}; }
  };
  return rv;
}
