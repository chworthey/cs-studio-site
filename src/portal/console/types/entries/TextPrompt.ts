import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";

export enum FormType {
  General,
  NotEmpty,
  Name,
  Email
};

export interface IConsoleEntryTextPrompt extends IConsoleEntry {
  type: ConsoleEntryType.TextPrompt;
  promptText: string;
  formType: FormType;
  isMultiline: boolean;
};

export interface IConsoleEntryStateTextPrompt extends IConsoleEntryState {
  type: ConsoleEntryType.TextPrompt;
  userInputText: string;
  continued: boolean;
  errorText?: string;
};

export interface IEntryTextPromptInit {
  Id: string;
  PromptText: string;
  FormType?: FormType;
  RequirementId?: string;
  IsMultiline?: boolean;
};

export function CreateTextPrompt(init: IEntryTextPromptInit) {
  const newEntry: IConsoleEntryTextPrompt = {
    type: ConsoleEntryType.TextPrompt,
    id: init.Id,
    promptText: init.PromptText,
    requirementId: init.RequirementId,
    isFocusable: false,
    formType: init.FormType === undefined ? FormType.General : init.FormType,
    isMultiline: init.IsMultiline === undefined ? false : init.IsMultiline,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export interface ITextPromptTrySetContinuedReturnValue {
  Graph: IConsoleGraph;
  ValidationSuccess: boolean;
}

export interface IValidateResult {
  Valid: boolean;
  CorrectedText?: string;
  ErrorMessage?: string;
};

export function ValidateTextInput(text: string, formType: FormType) {
  const rv: IValidateResult = {
    Valid: true
  };

  switch (formType) {
    case FormType.General:
      break;
    case FormType.NotEmpty:
      {
        const strippedText = text.trim();
        if (strippedText !== text) {
          rv.CorrectedText = strippedText;
        }
        if (strippedText === '') {
          rv.Valid = false;
          rv.ErrorMessage = 'This field must have at least one character.';
        }
      }
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

