import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IConsoleGraph } from "../IConsoleGraph";
import { IConsoleGraphNode } from "../IConsoleGraphNode";
import { IRequirement } from "../IRequirement";

export enum InfoConfirmType {
  RawText,
  Markdown
}

export interface IConsoleEntryInfoConfirm extends IConsoleEntry {
  type: ConsoleEntryType.InfoConfirm;
  inputFunc: (graph: IConsoleGraph) => string;
  inputType: InfoConfirmType;
  confirmButtonText: string;
}

export interface IConsoleEntryStateInfoConfirm extends IConsoleEntryState {
  type: ConsoleEntryType.InfoConfirm;
  input: string;
  isConfirmed: boolean;
}

export function CreateInfoConfirm(id: string, inputFunc: (graph: IConsoleGraph) => string, inputType: InfoConfirmType, confirmButtonText: string, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryInfoConfirm = { 
    type: ConsoleEntryType.InfoConfirm,
    id: id,
    inputFunc: inputFunc,
    inputType: inputType,
    confirmButtonText: confirmButtonText,
    requirement: requirement,
    isFocusable: true
  };

  return newEntry;
};

export function InfoConfirmSetConfirm(state: IConsoleEntryStateInfoConfirm, isConfirmed: boolean) {
  state.isConfirmed = isConfirmed;
}

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
    isFocused: false
  };
  return rv;
}