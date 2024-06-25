import { useEffect } from 'react';
import './Console.css';
import { IConsoleGraph, EntrySetFocus } from './ConsoleGraph';
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
import { GlobalInsertOn, IKeyPress, KeysByKeyCode, ToggleGlobalInsert } from '../keyboard/VirtualKeyboardTypes';
import { RadioMenuOnKeyDown } from './ConsoleInput';

interface IConsoleProps {
  graph: IConsoleGraph;
  onGraphUpdate(newGraph: IConsoleGraph): void;
}

function RenderEntry(graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusNext: boolean) => void) {
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

function OnKeyDown(keyPress: IKeyPress, graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusNext: boolean) => void) {
  switch (node.entry.type) {
    case ConsoleEntryType.RadioMenu:
      RadioMenuOnKeyDown(keyPress, graph, node, onUpdate);
      break;
    case ConsoleEntryType.TextPrompt:

      break;
    default:
      break;
  }
}

export function Console(props: IConsoleProps) {
  const graph = props.graph;

  const getVisibleNodes = (graph: IConsoleGraph) => {
    const visibleNodes: IConsoleGraphNode[] = [];
    for (let value of graph.NodesById.values()) {
      if (value.state.visible) {
        visibleNodes.push(value);
      }
    }

    return visibleNodes;
  }

  const visibleNodes = getVisibleNodes(graph);

  function onUpdate(newGraph: IConsoleGraph, focusNext: boolean = false) {
    const visibleNodes = getVisibleNodes(newGraph);
    if (focusNext && visibleNodes.length > 0) {
      const focusedId = visibleNodes[visibleNodes.length - 1].entry.id;
      EntrySetFocus(focusedId, newGraph, true);
    }
    props.onGraphUpdate(newGraph);
  };

  useEffect(() => {
    if (graph.FocusedNodeId) {
      const element = document.getElementById(graph.FocusedNodeId);
      if (element) {
        element.focus({ preventScroll: true });
        element.scrollIntoView({ behavior: 'smooth'});
      }
    }
  }, [graph.FocusedNodeId]);

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
          if (e.key === 'Insert') {
            ToggleGlobalInsert();
          }
          const key = KeysByKeyCode.get(e.key);
          if (key) {
            const caps = e.getModifierState('CapsLock');
            const shift = e.shiftKey;
            const control = e.ctrlKey;
            const insert = GlobalInsertOn;
            const keyPress: IKeyPress = {
              IsCapsDown: caps,
              IsShiftDown: shift,
              IsControlDown: control,
              IsInsertDown: insert,
              Key: key
            };
            OnKeyDown(keyPress, graph, n, onUpdate);
          }
          e.preventDefault();
        }}>
          <div className={n.state.isFocused ? "div__focus-indicator" : "div__focus-indicator div__focus-indicator--hidden"} aria-hidden={true}></div>
          <div className="div__console-entry" role="presentation">
            {RenderEntry(graph, n, onUpdate)}
          </div>
      </div>)}
    </div>
  );
}
