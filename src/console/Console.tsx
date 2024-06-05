import { useEffect, useRef, useState } from 'react';
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
import { IConsoleEntryTitleOutput } from './entries/TitleOutput';
import { TitleOutput } from './components/TitleOutput';
import { IConsoleEntryInfoConfirm, IConsoleEntryStateInfoConfirm, InfoConfirmType } from './entries/InfoConfirm';
import { InfoConfirm, InfoConfirmPropsRenderType } from './components/InfoConfirm';
import { TextPrompt } from './components/TextPrompt';
import { IConsoleEntryStateTextPrompt, IConsoleEntryTextPrompt, TextPromptSetContinued, TextPromptSetInputText } from './entries/TextPrompt';

interface IConsoleProps {
  entries: IConsoleEntry[],
  headerText: string | undefined
}

function RenderEntry(graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph) => void) {
  let rv = <></>;
  switch (node.entry.type) {
    case ConsoleEntryType.InfoConfirm:
      {
        const stateCast = node.state as IConsoleEntryStateInfoConfirm;
        const entryCast = node.entry as IConsoleEntryInfoConfirm;
        rv = <InfoConfirm input={stateCast.input} buttonText={entryCast.confirmButtonText} renderType={
          entryCast.inputType === InfoConfirmType.RawText ? InfoConfirmPropsRenderType.RawText :
          InfoConfirmPropsRenderType.Markdown
        }/>;
      }
      break;
    case ConsoleEntryType.DynamicOutput:
      {
        const stateCast = node.state as IConsoleEntryStateDynamicOutput;
        rv = <Output text={stateCast.text}/>;
      }
      break;
    case ConsoleEntryType.Output:
      {
        const entryCast = node.entry as IConsoleEntryOutput;
        rv = <Output text={entryCast.text}/>;
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
    case ConsoleEntryType.TitleOutput:
      {
        const entryCast = node.entry as IConsoleEntryTitleOutput;
        rv = <TitleOutput textParts={entryCast.textParts}/>;
      }
      break;
    case ConsoleEntryType.TextPrompt:
      {
        const entryCast = node.entry as IConsoleEntryTextPrompt;
        const stateCast = node.state as IConsoleEntryStateTextPrompt;
        rv = <TextPrompt 
          promptText={entryCast.promptText}
          inputText={stateCast.userInputText}
          onTextChange={text => {
            const newGraph = CloneConsoleGraph(graph);
            const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
            if (newNode) {
              const stateCast = newNode.state as IConsoleEntryStateTextPrompt;
              TextPromptSetInputText(stateCast, text);
              onUpdate(newGraph);
            }
          }}
          onContinue={() => {
            const newGraph = CloneConsoleGraph(graph);
            const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
            if (newNode) {
              const stateCast = newNode.state as IConsoleEntryStateTextPrompt;
              TextPromptSetContinued(stateCast, true);
              onUpdate(newGraph);
            }
          }}/>;
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

  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'});
  });

  return (
    <div className="div__console-area-wrapper">
      <div className="div__console-area">
        {props.headerText && <div className="div__console-header">{props.headerText}</div>}
        <div className="div__entries-area">
          {visibleNodes.map((n, i) => <div className="div__console-entry" key={i}>
            {RenderEntry(graph, n, newGraph => {
              UpdateConsoleGraph(newGraph);
              setGraphState(newGraph.state);
            })}
          </div>)}
          <div ref={bottomRef}></div>
        </div>
      </div>
    </div>
  );
}
