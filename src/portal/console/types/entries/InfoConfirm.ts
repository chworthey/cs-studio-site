import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IConsoleGraph } from "../ConsoleGraph";
import { IConsoleGraphNode } from "../GraphNode";

export enum InfoConfirmType {
  RawText,
  Markdown
};

export interface IConsoleEntryInfoConfirm extends IConsoleEntry {
  type: ConsoleEntryType.InfoConfirm;
  title: string;
  inputFunc: (graph: IConsoleGraph) => string;
  inputType: InfoConfirmType;
  confirmButtonText: string;
  confirmButtonConfirmedText: string;
};

export interface IConsoleEntryStateInfoConfirm extends IConsoleEntryState {
  type: ConsoleEntryType.InfoConfirm;
  input: string;
  isConfirmed: boolean;
};

export interface IEntryInfoConfirmInit {
  Id: string;
  Title: string;
  InputFunc: (graph: IConsoleGraph) => string;
  InputType: InfoConfirmType;
  ConfirmButtonText: string;
  ConfirmButtonConfirmedText: string;
  RequirementId?: string;
};

export function CreateInfoConfirm(init: IEntryInfoConfirmInit) {
  const newEntry: IConsoleEntryInfoConfirm = { 
    type: ConsoleEntryType.InfoConfirm,
    id: init.Id,
    title: init.Title,
    inputFunc: init.InputFunc,
    inputType: init.InputType,
    confirmButtonText: init.ConfirmButtonText,
    confirmButtonConfirmedText: init.ConfirmButtonConfirmedText,
    requirementId: init.RequirementId,
    isFocusable: false,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function UpdateInfoConfirm(graph: IConsoleGraph, node: IConsoleGraphNode) {
  if (node.entry.type === ConsoleEntryType.InfoConfirm &&
    node.state.type === ConsoleEntryType.InfoConfirm) {
      const entryCast = node.entry as IConsoleEntryInfoConfirm;
      const stateCast = node.state as IConsoleEntryStateInfoConfirm;
      stateCast.input = entryCast.inputFunc(graph);
    }
}

export function CreateInfoConfirmState(id: string) {
  const rv: IConsoleEntryStateInfoConfirm = {
    id: id,
    type: ConsoleEntryType.InfoConfirm,
    input: '',
    visible: true,
    isConfirmed: false,
    isFocused: false,
    Clone: function() { return {...this}; }
  };
  return rv;
}