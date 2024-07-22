import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";

export interface IConsoleEntryRequestButton extends IConsoleEntry {
  type: ConsoleEntryType.RequestButton;
  buttonText: string;
  onStartRequest(graph: IConsoleGraph, onComplete: (success: boolean) => void): void;
};

export enum RequestButtonState {
  NotStarted,
  Started,
  Succeeded,
  Failed
};

export interface IConsoleEntryStateRequestButton extends IConsoleEntryState {
  type: ConsoleEntryType.RequestButton;
  state: RequestButtonState;
};

export interface IEntryRequestButtonInit {
  Id: string;
  ButtonText: string;
  OnStartRequest: (graph: IConsoleGraph, onComplete: (success: boolean) => void) => void;
  RequirementId?: string;
};

export function CreateRequestButton(init: IEntryRequestButtonInit) {
  const newEntry: IConsoleEntryRequestButton = {
    type: ConsoleEntryType.RequestButton,
    onStartRequest: init.OnStartRequest,
    id: init.Id,
    buttonText: init.ButtonText,
    requirementId: init.RequirementId,
    isFocusable: false,
    
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function CreateRequestButtonState(id: string) {
  const rv: IConsoleEntryStateRequestButton = {
    id: id,
    type: ConsoleEntryType.RequestButton,
    visible: true,
    state: RequestButtonState.NotStarted,
    isFocused: false,
    Clone: function() { return {...this}; }
  };

  return rv;
};
