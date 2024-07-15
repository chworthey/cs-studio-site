import { ConsoleEntryType } from "../ConsoleEntryType";
import { ConsoleGraphUpdateEntry, FindConsoleGraphNode, IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

export enum FormType {
  General,
  Name,
  Email
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
  errorText?: string;
}

export function CreateTextPrompt(id: string, promptText: string, formType: FormType = FormType.General, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryTextPrompt = {
    type: ConsoleEntryType.TextPrompt,
    id: id,
    promptText: promptText,
    requirement: requirement,
    isFocusable: false,
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

export interface ITextPromptTrySetContinuedReturnValue {
  Graph: IConsoleGraph;
  ValidationSuccess: boolean;
}

interface IValidateResult {
  Valid: boolean;
  CorrectedText?: string;
  ErrorMessage?: string;
}

function validate(text: string, formType: FormType) {
  const rv: IValidateResult = {
    Valid: true
  };

  switch (formType) {
    case FormType.General:
      break;
    case FormType.Name:
      {
        const strippedText = text.trim();
        if (strippedText !== text) {
          rv.CorrectedText = strippedText;
        }
        if (strippedText === '') {
          rv.Valid = false;
          rv.ErrorMessage = 'The name must have at least one character.';
        }
      }
      break;
    case FormType.Email:
      {
        const strippedText = text.trim();
        if (strippedText !== text) {
          rv.CorrectedText = strippedText;
        }
        if (strippedText === '') {
          rv.Valid = false;
          rv.ErrorMessage = 'The email address must have at least one character.';
        }
        else if (!/.+@.+\..+/.test(strippedText)) {
          rv.Valid = false;
          rv.ErrorMessage = 'The email address does not match the expected _@_._ format.';
        }
      }
    break;
    default:
      break;
  }

  return rv;
}

export function TextPromptTrySetContinued(entryId: string, graph: IConsoleGraph, continued: boolean): ITextPromptTrySetContinuedReturnValue {
  if (continued) {
    const node = FindConsoleGraphNode(graph, entryId);
    if (node && node.entry.type === ConsoleEntryType.TextPrompt) {
      const entryCast = node.entry as IConsoleEntryTextPrompt;
      const stateCast = node.state as IConsoleEntryStateTextPrompt;
      const result = validate(stateCast.userInputText, entryCast.formType);
      const errorText = result.Valid ? undefined : result.ErrorMessage;
      const continued = result.Valid;
      let inputText = stateCast.userInputText;
      if (result.CorrectedText !== undefined) {
        inputText = result.CorrectedText;
      }
      return {
        Graph: ConsoleGraphUpdateEntry<IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt>(
          entryId,
          graph,
          state => {
            state.continued = continued;
            state.errorText = errorText;
            state.userInputText = inputText;
          }
        ),
        ValidationSuccess: result.Valid
      };
    }
    else {
      return {
        Graph: graph,
        ValidationSuccess: false
      }
    }
  }
  else {
    return {
      Graph: ConsoleGraphUpdateEntry<IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt>(
        entryId,
        graph,
        state => { state.continued = continued; }
      ),
      ValidationSuccess: true
    };
  }
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

