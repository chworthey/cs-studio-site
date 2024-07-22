import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";

export interface IConsoleEntryOutput extends IConsoleEntry {
  type: ConsoleEntryType.Output;
  text: string;
}

export interface IConsoleEntryStateOutput extends IConsoleEntryState {
  type: ConsoleEntryType.Output;
};

export interface IEntryOutputInit {
  Id: string;
  Text: string;
  RequirementId?: string;
};

export function CreateOutput(init: IEntryOutputInit) {
  const newEntry: IConsoleEntryOutput = { 
    type: ConsoleEntryType.Output,
    id: init.Id,
    text: init.Text,
    requirementId: init.RequirementId,
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
