import { useEffect, useState } from 'react';
import './Console.css';
import { IConsoleGraph, EntrySetFocus, ConsoleGraphUpdateAllEntries } from './ConsoleGraph';
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

interface IConsoleProps {
  graph: IConsoleGraph;
  onGraphUpdate(newGraph: IConsoleGraph): void;
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
              let newGraph = graph.Clone();
              RadioMenuFocusItem(node.entry.id, newGraph, id);
              RadioMenuSelectItem(node.entry.id, newGraph, id);
              onUpdate(newGraph, true);
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
            const newGraph = graph.Clone();
            TextPromptSetInputText(node.entry.id, newGraph, text);
            onUpdate(newGraph, false);
          }}
          onContinue={() => {
            const newGraph = graph.Clone();
            TextPromptSetContinued(node.entry.id, newGraph, true);
            onUpdate(newGraph, true);
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
    const newGraph = graph.Clone();
    RadioMenuFocusItem(node.entry.id, newGraph, id);
    onUpdate(newGraph, false);
  };

  const onMenuItemSelect = (id: string) => {
    let newGraph = graph.Clone();
    RadioMenuFocusItem(node.entry.id, newGraph, id);
    RadioMenuSelectItem(node.entry.id, newGraph, id);
    onUpdate(newGraph, true);
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
  const graph = props.graph;

  const [needsRefocus, setNeedsRefocus] = useState(false);

  const visibleNodes: IConsoleGraphNode[] = [];
  for (let value of graph.NodesById.values()) {
    if (value.state.visible) {
      visibleNodes.push(value);
    }
  }

  function onUpdate(newGraph: IConsoleGraph, focusEnd: boolean = false) {
    props.onGraphUpdate(newGraph);
    setNeedsRefocus(focusEnd);
  };

  useEffect(() => {
    if (needsRefocus && visibleNodes.length > 0) {
      const focusedId = visibleNodes[visibleNodes.length - 1].entry.id;
      const element = document.getElementById(focusedId);
      if (element) {
        element.focus({ preventScroll: true });
        element.scrollIntoView({ behavior: 'smooth'});

        const newGraph = graph.Clone();
        ConsoleGraphUpdateAllEntries(newGraph, (state, entry) => { 
          state.isFocused = entry.id === focusedId;
        });
        onUpdate(newGraph, false);
      }
    }
  }, [needsRefocus, visibleNodes, document, onUpdate]);
  console.log(graph);

  return (
    <div id='console' className="div__entries-area" role="presentation">
      {visibleNodes.map((n, i) => <div
        id={n.entry.id}
        className={n.state.isFocused ?
          "div__console-entry-wrapper div__console-entry-wrapper--focused" :
          "div__console-entry-wrapper"}
        key={i}
        role="presentation"
        tabIndex={n.entry.isFocusable ? 0 : undefined}
        onChange={c => c.currentTarget}
        onFocus={() => {
          const newGraph = graph.Clone();
          EntrySetFocus(n.entry.id, newGraph, true);
          onUpdate(newGraph);
        }}
        onKeyDown={e => {
          OnKeyDown(e.key, graph, n, onUpdate);
          e.preventDefault();
        }}>
          {n.state.isFocused && <div className="div__focus-indicator" aria-hidden={true}></div>}
          <div className="div__console-entry" role="presentation">
            {RenderEntry(graph, n, onUpdate)}
          </div>
      </div>)}
    </div>
  );
}
