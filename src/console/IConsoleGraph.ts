import { ConsoleEntryType } from "./ConsoleEntryType";
import { IConsoleEntry } from "./IConsoleEntry";
import { IConsoleEntryState } from "./IConsoleEntryState";
import { IConsoleGraphNode } from "./IConsoleGraphNode";
import { CreateDyanamicOutputState, UpdateDynamicOutput } from "./entries/DynamicOutput";
import { CreateInfoConfirmState, UpdateInfoConfirm } from "./entries/InfoConfirm";
import { CreateOutputState } from "./entries/Output";
import { CreateRadioMenuState } from "./entries/RadioMenu";
import { CreateTextPromptState } from "./entries/TextPrompt";

export interface IConsoleGraph {
  nodes: IConsoleGraphNode[];
  nodesById: Map<string, IConsoleGraphNode>;
  state: IConsoleEntryState[];
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
    entry: e,
    state: state[i]
  }));

  const rv: IConsoleGraph = {
    nodes: nodes,
    nodesById: new Map<string, IConsoleGraphNode>(nodes.map(n => [n.entry.id, n])),
    state
  };

  UpdateConsoleGraph(rv);

  return rv;
};

export function CloneConsoleGraph(graph: IConsoleGraph) {
  const newNodes: IConsoleGraphNode[] = graph.nodes.map(n => ({
    entry: {...n.entry},
    state: {...n.state}
  }));

  const rv: IConsoleGraph ={
    nodes: newNodes,
    nodesById: new Map<string, IConsoleGraphNode>(newNodes.map(n => [n.entry.id, n])),
    state: newNodes.map(n => n.state),
  };

  return rv;
};

export function SetConsoleGraphState(graph: IConsoleGraph, state: IConsoleEntryState[]) {
  graph.state = state;
  graph.nodes.forEach((n, i) => n.state = state[i]);
};

export function UpdateConsoleGraph(graph: IConsoleGraph) {
  for (const node of graph.nodes) {
    switch (node.entry.type) {
      case ConsoleEntryType.InfoConfirm:
        UpdateInfoConfirm(graph, node);
        break;
      case ConsoleEntryType.DynamicOutput:
        UpdateDynamicOutput(graph, node);
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
}

export function FindConsoleGraphNode(graph: IConsoleGraph, entryId: string) {
  return graph.nodesById.get(entryId);
}
