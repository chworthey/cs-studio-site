import { useEffect, useRef, useState } from 'react';
import './Console.css';
import { IConsoleEntry } from './IConsoleEntry';
import { CloneConsoleGraph, CreateNewConsoleGraph, FindConsoleGraphNode, IConsoleGraph, SetConsoleGraphState, UpdateConsoleGraph } from './IConsoleGraph';
import { ConsoleEntryType } from './ConsoleEntryType';
import { IConsoleGraphNode } from './IConsoleGraphNode';
import { Output } from './components/Output';
import { IConsoleEntryStateDynamicOutput } from './entries/DynamicOutput';
import { IConsoleEntryOutput } from './entries/Output';
import { IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu, RadioMenuFocusItem, RadioMenuSelectItem } from './entries/RadioMenu';
import { RadioMenu } from './components/RadioMenu';
import { IConsoleEntryTitleOutput } from './entries/TitleOutput';
import { TitleOutput } from './components/TitleOutput';
import { IConsoleEntryInfoConfirm, IConsoleEntryStateInfoConfirm, InfoConfirmType } from './entries/InfoConfirm';
import { InfoConfirm, InfoConfirmPropsRenderType } from './components/InfoConfirm';
import { TextPrompt } from './components/TextPrompt';
import { IConsoleEntryStateTextPrompt, IConsoleEntryTextPrompt, TextPromptSetContinued, TextPromptSetInputText } from './entries/TextPrompt';
import { EntrySetFocus } from './IConsoleEntryState';

interface IConsoleProps {
  entries: IConsoleEntry[]
}

function RenderEntry(graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusEnd: boolean) => void) {
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
            focusedMenuItem={stateCast.focusedItem ? stateCast.focusedItem : undefined}
            isFocused={stateCast.isFocused}
            onMenuItemSelect={(id: string) => {
              const newGraph = CloneConsoleGraph(graph);
              const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
              if (newNode) {
                const stateCast = newNode.state as IConsoleEntryStateRadioMenu;
                if (stateCast) {
                  RadioMenuFocusItem(stateCast, id);
                  RadioMenuSelectItem(stateCast, id);
                  onUpdate(newGraph, true);
                }
              }
            }}/>;
        }
      }
      break;
    case ConsoleEntryType.TitleOutput:
      {
        const entryCast = node.entry as IConsoleEntryTitleOutput;
        rv = <TitleOutput textParts={entryCast.textParts} accessibilityLabel={entryCast.accessibilityLabel}/>;
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
              onUpdate(newGraph, false);
            }
          }}
          onContinue={() => {
            const newGraph = CloneConsoleGraph(graph);
            const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
            if (newNode) {
              const stateCast = newNode.state as IConsoleEntryStateTextPrompt;
              TextPromptSetContinued(stateCast, true);
              onUpdate(newGraph, true);
            }
          }}/>;
      }
      break;
    default:
      break;
  }

  return rv;
}

function RadioMenuOnKeyDown(key: string, graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusEnd: boolean) => void) {
  const entryCast = node.entry as IConsoleEntryRadioMenu;
  const stateCast = node.state as IConsoleEntryStateRadioMenu;

  const onMenuItemFocus = (id: string) => {
    const newGraph = CloneConsoleGraph(graph);
    const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
    if (newNode) {
      const stateCast = newNode.state as IConsoleEntryStateRadioMenu;
      if (stateCast) {
        RadioMenuFocusItem(stateCast, id);
        onUpdate(newGraph, false);
      }
    }
  };

  const onMenuItemSelect = (id: string) => {
    const newGraph = CloneConsoleGraph(graph);
    const newNode = FindConsoleGraphNode(newGraph, node.entry.id);
    if (newNode) {
      const stateCast = newNode.state as IConsoleEntryStateRadioMenu;
      if (stateCast) {
        RadioMenuFocusItem(stateCast, id);
        RadioMenuSelectItem(stateCast, id);
        onUpdate(newGraph, true);
      }
    }
  };

  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
      {
        const i = entryCast.items.findIndex(i => i.id === stateCast.focusedItem);
        if (i >= 0) {
          onMenuItemFocus(entryCast.items[(i + 1) % entryCast.items.length].id);
        }
      }
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      {
        const i = entryCast.items.findIndex(i => i.id === stateCast.focusedItem);
        if (i >= 0) {
          onMenuItemFocus(entryCast.items[
            (i - 1 + entryCast.items.length) % entryCast.items.length
          ].id);
        }
      }
      break;
    case 'Enter':
    case 'Spacebar':
    case ' ':
      if (stateCast.focusedItem) {
        onMenuItemSelect(stateCast.focusedItem);
      }
      break;
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      {
        const i = parseInt(key) - 1;
        if (i < entryCast.items.length) {
          onMenuItemSelect(entryCast.items[i].id);
        }
      }
      break;
    default:
      break;
  }
}

function TextPromptOnKeyDown(key: string, graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusEnd: boolean) => void) {
  switch (key) {
    case 'Enter':
      break;
    case '':
      break;
    default:
      break;
  }
}

function OnKeyDown(key: string, graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusEnd: boolean) => void) {
  switch (node.entry.type) {
    case ConsoleEntryType.RadioMenu:
      RadioMenuOnKeyDown(key, graph, node, onUpdate);
      break;
    case ConsoleEntryType.TextPrompt:

      break;
    default:
      break;
  }
}

export function Console(props: IConsoleProps) {

  const graph = CreateNewConsoleGraph(props.entries);

  const [graphState, setGraphState] = useState(graph.state);
  const [needsRefocus, setNeedsRefocus] = useState(false);

  SetConsoleGraphState(graph, graphState);

  const visibleNodes = graph.nodes.filter(n => n.state.visible);

  const onUpdate = (newGraph: IConsoleGraph, focusEnd: boolean = false) => {
    UpdateConsoleGraph(newGraph);
    setGraphState(newGraph.state);
    setNeedsRefocus(focusEnd);
  };

  useEffect(() => {
    if (needsRefocus && visibleNodes.length > 0) {
      const focusedId = visibleNodes[visibleNodes.length - 1].entry.id;
      const element = document.getElementById(focusedId);
      if (element) {
        element.focus({ preventScroll: true });
        element.scrollIntoView({ behavior: 'smooth'});
        const newGraph = CloneConsoleGraph(graph);
        newGraph.nodes.forEach(n => n.state.isFocused = n.entry.id === focusedId);
        onUpdate(newGraph, false);
      }
    }
  }, [needsRefocus, visibleNodes, document, onUpdate]);

  return (
    <div className="div__entries-area" role="presentation">
      {visibleNodes.map((n, i) => <div
        id={n.entry.id}
        className={n.state.isFocused ?
          "div__console-entry-wrapper div__console-entry-wrapper--focused" :
          "div__console-entry-wrapper"}
        key={i}
        role="presentation"
        tabIndex={n.entry.isFocusable ? 0 : undefined}
        onFocus={() => {
          const newGraph = CloneConsoleGraph(graph);
          const newNode = FindConsoleGraphNode(newGraph, n.entry.id);
          if (newNode) {
            EntrySetFocus(newNode.state, true);
            onUpdate(newGraph);
          }
        }}
        onBlur={() => {
          const newGraph = CloneConsoleGraph(graph);
          const newNode = FindConsoleGraphNode(newGraph, n.entry.id);
          if (newNode) {
            EntrySetFocus(newNode.state, false);
            onUpdate(newGraph);
          }
        }}
        onKeyDown={e => {
          console.log(e.key);
          OnKeyDown(e.key, graph, n, onUpdate);
        }}>
          {n.state.isFocused && <div className="div__focus-indicator" aria-hidden={true}></div>}
          <div className="div__console-entry" role="presentation">
            {RenderEntry(graph, n, onUpdate)}
          </div>
      </div>)}
    </div>
  );
}
