import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { ConsoleGraphUpdateEntry, IConsoleGraph } from "../ConsoleGraph";
import { IConsoleGraphNode } from "../IConsoleGraphNode";
import { IRequirement } from "../IRequirement";

export enum InfoConfirmType {
  RawText,
  Markdown
}

export interface IConsoleEntryInfoConfirm extends IConsoleEntry {
  type: ConsoleEntryType.InfoConfirm;
  title: string;
  inputFunc: (graph: IConsoleGraph) => string;
  inputType: InfoConfirmType;
  confirmButtonText: string;
  confirmButtonConfirmedText: string;
}

export interface IConsoleEntryStateInfoConfirm extends IConsoleEntryState {
  type: ConsoleEntryType.InfoConfirm;
  input: string;
  isConfirmed: boolean;
}

export function CreateInfoConfirm(id: string, title: string, inputFunc: (graph: IConsoleGraph) => string, inputType: InfoConfirmType, confirmButtonText: string, confirmButtonConfirmedText: string, requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryInfoConfirm = { 
    type: ConsoleEntryType.InfoConfirm,
    id: id,
    title: title,
    inputFunc: inputFunc,
    inputType: inputType,
    confirmButtonText: confirmButtonText,
    confirmButtonConfirmedText: confirmButtonConfirmedText,
    requirement: requirement,
    isFocusable: false,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function InfoConfirmSetConfirm(entryId: string, graph: IConsoleGraph, isConfirmed: boolean) {
  return ConsoleGraphUpdateEntry<IConsoleEntryInfoConfirm, IConsoleEntryStateInfoConfirm>(
    entryId,
    graph,
    state => { state.isConfirmed = isConfirmed; }
  );
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
    isFocused: false,
    Clone: function() { return {...this}; }
  };
  return rv;
}