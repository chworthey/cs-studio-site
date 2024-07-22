import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IConsoleGraphNode } from "../GraphNode";

export interface IConsoleEntryDynamicOutput extends IConsoleEntry {
  type: ConsoleEntryType.DynamicOutput;
  textFunc: (graph: IConsoleGraph) => string;
};

export interface IConsoleEntryStateDynamicOutput extends IConsoleEntryState {
  type: ConsoleEntryType.DynamicOutput;
  text: string;
};

export interface IEntryDynamicOutputInit {
  Id: string;
  TextFunc: (graph: IConsoleGraph) => string;
  RequirementId?: string;
};

export function CreateDynamicOutput(init: IEntryDynamicOutputInit) {
  const newEntry: IConsoleEntryDynamicOutput = {
    type: ConsoleEntryType.DynamicOutput,
    id: init.Id,
    textFunc: init.TextFunc,
    requirementId: init.RequirementId,
    isFocusable: false,
    Clone: function() { return {...this}; }
  };

  return newEntry;
};

export function UpdateDynamicOutput(graph: IConsoleGraph, node: IConsoleGraphNode) {
  if (node.entry.type === ConsoleEntryType.DynamicOutput &&
    node.state.type === ConsoleEntryType.DynamicOutput) {
      const entryCast = node.entry as IConsoleEntryDynamicOutput;
      const stateCast = node.state as IConsoleEntryStateDynamicOutput;
      stateCast.text = entryCast.textFunc(graph);
    }
};

export function CreateDynamicOutputState(id: string) {
  const rv: IConsoleEntryStateDynamicOutput = {
    id: id,
    type: ConsoleEntryType.DynamicOutput,
    visible: true,
    text: '',
    isFocused: false,
    Clone: function() { return {...this}; }
  };

  return rv;
};

