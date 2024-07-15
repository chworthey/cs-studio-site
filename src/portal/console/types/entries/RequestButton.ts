import { ConsoleEntryType } from "../ConsoleEntryType";
import { ConsoleGraphUpdateEntry, IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IRequirement } from "../IRequirement";

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
}

export function CreateRequestButton(id: string, buttonText: string, onStartRequest: (graph: IConsoleGraph, onComplete: (success: boolean) => void) => void, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryRequestButton = {
    type: ConsoleEntryType.RequestButton,
    onStartRequest: onStartRequest,
    id: id,
    buttonText: buttonText,
    requirement: requirement,
    isFocusable: false,
    
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function RequestButtonStartRequest(entryId: string, graph: IConsoleGraph) {
  return ConsoleGraphUpdateEntry<IConsoleEntryRequestButton, IConsoleEntryStateRequestButton>(
    entryId,
    graph,
    state => { state.state = RequestButtonState.Started; }
  );
}

export function RequestButtonEndRequest(entryId: string, graph: IConsoleGraph, success: boolean) {
  return ConsoleGraphUpdateEntry<IConsoleEntryRequestButton, IConsoleEntryStateRequestButton>(
    entryId,
    graph,
    state => { state.state = success ? RequestButtonState.Succeeded : RequestButtonState.Failed }
  );
}

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

