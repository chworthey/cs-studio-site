import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";

export interface IConsoleEntryTitleOutput extends IConsoleEntry {
  type: ConsoleEntryType.TitleOutput;
  textParts: string[];
  accessibilityLabel: string;
};

export interface IConsoleEntryStateTitleOutput extends IConsoleEntryState {
  type: ConsoleEntryType.TitleOutput;
};

export interface IEntryTitleOutputInit {
  Id: string;
  TextParts: string[];
  AccessibilityLabel: string;
  RequirementId?: string;
};

export function CreateTitleOutput(init: IEntryTitleOutputInit) {
  const newEntry: IConsoleEntryTitleOutput = { 
    type: ConsoleEntryType.TitleOutput,
    id: init.Id,
    textParts: init.TextParts,
    accessibilityLabel: init.AccessibilityLabel,
    requirementId: init.RequirementId,
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
