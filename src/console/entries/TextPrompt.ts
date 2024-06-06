import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

export interface IConsoleEntryTextPrompt extends IConsoleEntry {
  type: ConsoleEntryType.TextPrompt;
  promptText: string;
};

export interface IConsoleEntryStateTextPrompt extends IConsoleEntryState {
  type: ConsoleEntryType.TextPrompt;
  userInputText: string;
  continued: boolean;
}

export function CreateTextPrompt(id: string, promptText: string, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryTextPrompt = {
    type: ConsoleEntryType.TextPrompt,
    id: id,
    promptText: promptText,
    requirement: requirement,
    isFocusable: true
  };

  return newEntry;
};

export function TextPromptSetInputText(state: IConsoleEntryStateTextPrompt, text: string) {
  state.userInputText = text;
};

export function TextPromptSetContinued(state: IConsoleEntryStateTextPrompt, continued: boolean) {
  state.continued = continued;
};

export function CreateTextPromptState(id: string) {
  const rv: IConsoleEntryStateTextPrompt = {
    id: id,
    type: ConsoleEntryType.TextPrompt,
    visible: true,
    userInputText: '',
    continued: false,
    isFocused: false
  };

  return rv;
};

