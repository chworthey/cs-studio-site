import { useState } from 'react';
import './Console.css';
import { IConsoleEntry } from './IConsoleEntry';
import { CloneConsoleGraph, CreateNewConsoleGraph, FindConsoleGraphNode, IConsoleGraph, SetConsoleGraphState, UpdateConsoleGraph } from './IConsoleGraph';
import { ConsoleEntryType } from './ConsoleEntryType';
import { IConsoleGraphNode } from './IConsoleGraphNode';
import { Output } from './components/Output';
import { IConsoleEntryStateDynamicOutput } from './entries/DynamicOutput';
import { IConsoleEntryOutput } from './entries/Output';
import { IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu, RadioMenuSelectItem } from './entries/RadioMenu';
import { RadioMenu } from './components/RadioMenu';

interface IConsoleProps {
  entries: IConsoleEntry[]
}

function RenderEntry(graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph) => void) {
  let rv = <></>;
  switch (node.entry.type) {
    case ConsoleEntryType.DynamicOutput:
      {
        const stateCast = node.state as IConsoleEntryStateDynamicOutput;
        rv = <Output text={stateCast.text}/>
      }
      break;
    case ConsoleEntryType.Output:
      {
        const entryCast = node.entry as IConsoleEntryOutput;
        rv = <Output text={entryCast.text}/>
      }
      break;
    case ConsoleEntryType.RadioMenu:
      {
        const entryCast = node.entry as IConsoleEntryRadioMenu;
        const stateCast = node.state as IConsoleEntryStateRadioMenu;
        if (entryCast && stateCast) {
          rv = <RadioMenu
            text={entryCast.text}
            menuItems={entryCast.items.map(i => ({ id: i.id, text: i.text}))}
            selectedItemId={stateCast.activeItem ? stateCast.activeItem : undefined}
            onMenuItemSelect={(id: string) => {
              const newGraph = CloneConsoleGraph(graph);
              const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
              if (newNode) {
                const stateCast = newNode.state as IConsoleEntryStateRadioMenu;
                if (stateCast) {
                  RadioMenuSelectItem(stateCast, id);
                  onUpdate(newGraph);
                }
              }
            }}/>;
        }
      }
      break;
    default:
      break;
  }

  return rv;
}

export function Console(props: IConsoleProps) {

  const graph = CreateNewConsoleGraph(props.entries);

  const [graphState, setGraphState] = useState(graph.state);

  SetConsoleGraphState(graph, graphState);

  const visibleNodes = graph.nodes.filter(n => n.state.visible);

  return (
    <div className="div__console-area">
      {visibleNodes.map((n, i) => <div className="div__console-entry" key={i}>
        {RenderEntry(graph, n, newGraph => {
          UpdateConsoleGraph(newGraph);
          setGraphState(newGraph.state);
        })}
      </div>)}
    </div>
  );
}
