import { ConsoleEntryType } from "../ConsoleEntryType";
import { ConsoleGraphUpdateEntry, IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

export enum FormType {
  General,
  Name
};

export interface IConsoleEntryTextPrompt extends IConsoleEntry {
  type: ConsoleEntryType.TextPrompt;
  promptText: string;
  formType: FormType;
};

export interface IConsoleEntryStateTextPrompt extends IConsoleEntryState {
  type: ConsoleEntryType.TextPrompt;
  userInputText: string;
  continued: boolean;
}

export function CreateTextPrompt(id: string, promptText: string, formType: FormType = FormType.General, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryTextPrompt = {
    type: ConsoleEntryType.TextPrompt,
    id: id,
    promptText: promptText,
    requirement: requirement,
    isFocusable: true,
    formType: formType,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function TextPromptSetInputText(entryId: string, graph: IConsoleGraph, text: string) {
  return ConsoleGraphUpdateEntry<IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt>(
    entryId,
    graph,
    state => { state.userInputText = text; }
  );
};

export function TextPromptSetContinued(entryId: string, graph: IConsoleGraph, continued: boolean) {
  return ConsoleGraphUpdateEntry<IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt>(
    entryId,
    graph,
    state => { state.continued = continued; }
  );
};

export function CreateTextPromptState(id: string) {
  const rv: IConsoleEntryStateTextPrompt = {
    id: id,
    type: ConsoleEntryType.TextPrompt,
    visible: true,
    userInputText: '',
    continued: false,
    isFocused: false,
    Clone: function() { return {...this}; }
  };

  return rv;
};

