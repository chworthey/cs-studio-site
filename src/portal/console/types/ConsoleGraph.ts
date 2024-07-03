import { IClonable } from "../../shared/IClonable";
import { ConsoleEntryType } from "./ConsoleEntryType";
import { IConsoleEntry } from "./IConsoleEntry";
import { IConsoleEntryState } from "./IConsoleEntryState";
import { IConsoleGraphNode } from "./IConsoleGraphNode";
import { CreateDyanamicOutputState, UpdateDynamicOutput } from "./entries/DynamicOutput";
import { CreateInfoConfirmState, UpdateInfoConfirm } from "./entries/InfoConfirm";
import { CreateOutputState } from "./entries/Output";
import { CreateRadioMenuState, UpdateRadioMenu } from "./entries/RadioMenu";
import { CreateTextPromptState } from "./entries/TextPrompt";

export interface IConsoleGraph extends IClonable<IConsoleGraph> {
  NodesById: Map<string, IConsoleGraphNode>;
  FocusedNodeId?: string;
};

function CreateEntryState(entry: IConsoleEntry) {
  let rv: IConsoleEntryState;
  switch (entry.type) {
    case ConsoleEntryType.InfoConfirm:
      rv = CreateInfoConfirmState(entry.id);
      break;
    case ConsoleEntryType.DynamicOutput:
      rv = CreateDyanamicOutputState(entry.id);
      break;
    case ConsoleEntryType.RadioMenu:
      rv = CreateRadioMenuState(entry.id);
      break;
    case ConsoleEntryType.TextPrompt:
      rv = CreateTextPromptState(entry.id);
      break;
    case ConsoleEntryType.Output:
    default:
      rv = CreateOutputState(entry.id);
      break;
  }

  return rv;
}

export function CreateNewConsoleGraph(entries: IConsoleEntry[]) {
  const state: IConsoleEntryState[] = entries.map(e => CreateEntryState(e));

  const nodes = entries.map((e, i) => ({
    order: i,
    entry: e,
    state: state[i]
  }));

  const rv: IConsoleGraph = {
    NodesById: new Map<string, IConsoleGraphNode>(nodes.map((n => [n.entry.id, n]))),
    Clone: function () { return CloneConsoleGraph(this); }
  };

  UpdateConsoleGraph(rv);

  return rv;
};

export function CloneConsoleGraph(graph: IConsoleGraph) {
  const newNodes: IConsoleGraphNode[] = [];
  for (let value of graph.NodesById.values()) {
    newNodes.push({
      order: value.order,
      entry: value.entry.Clone(),
      state: value.state.Clone(),
    });
  }

  const rv: IConsoleGraph = {
    NodesById: new Map<string, IConsoleGraphNode>(newNodes.map(n => [n.entry.id, n])),
    Clone: function () { return CloneConsoleGraph(this); },
    FocusedNodeId: graph.FocusedNodeId
  };

  return rv;
};

export function UpdateConsoleGraph(graph: IConsoleGraph) {
  for (let node of graph.NodesById.values()) {
    switch (node.entry.type) {
      case ConsoleEntryType.InfoConfirm:
        UpdateInfoConfirm(graph, node);
        break;
      case ConsoleEntryType.DynamicOutput:
        UpdateDynamicOutput(graph, node);
        break;
      case ConsoleEntryType.RadioMenu:
        UpdateRadioMenu(node);
        break;
      default:
        break;
    }

    if (node.entry.requirement) {
      node.state.visible = node.entry.requirement.RequirementMet(graph);
    }
    else {
      node.state.visible = true;
    }
  }
};

export function FindConsoleGraphNode(graph: IConsoleGraph, entryId: string) {
  return graph.NodesById.get(entryId);
};

export function ConsoleGraphUpdateAllEntries(graph: IConsoleGraph, updateFunc: (state: IConsoleEntryState, entry: IConsoleEntry) => void) {
  for (let value of graph.NodesById.values()) {
    updateFunc(value.state, value.entry)
  }
  UpdateConsoleGraph(graph);
  return graph;
};

export function ConsoleGraphUpdateEntry<E extends IConsoleEntry, S extends IConsoleEntryState>(
  entryId: string, graph: IConsoleGraph, updateFunc: (state: S, entry: E) => void)
{
  const newNode = FindConsoleGraphNode(graph, entryId);
  if (newNode) {
    updateFunc(newNode.state as S, newNode.entry as E);
    UpdateConsoleGraph(graph);
  }

  return graph;
};

export function EntrySetFocus(entryId: string, graph: IConsoleGraph, focus: boolean) {
  if (focus) {
    ConsoleGraphClearFocus(graph);
    graph.FocusedNodeId = entryId;
  }
  return ConsoleGraphUpdateEntry<IConsoleEntry, IConsoleEntryState>(
    entryId, graph, state => { state.isFocused = focus; });
};

export function ConsoleGraphClearFocus(graph: IConsoleGraph) {
  const nodeId = graph.FocusedNodeId;
  graph.FocusedNodeId = undefined;
  if (nodeId) {
    return ConsoleGraphUpdateEntry<IConsoleEntry, IConsoleEntryState>(
      nodeId, graph, state => { state.isFocused = false; });
  }
  else {
    return graph;
  }
}
