import { useEffect } from 'react';
import '../styles/Console.css';
import { IConsoleGraph, EntrySetFocus, ConsoleGraphClearFocus } from '../types/ConsoleGraph';
import { ConsoleEntryType } from '../types/ConsoleEntryType';
import { Output } from './Output';
import { RadioMenu } from './RadioMenu';
import { TitleOutput } from './TitleOutput';
import { InfoConfirm, InfoConfirmPropsRenderType } from './InfoConfirm';
import { TextPrompt } from './TextPrompt';
import { IConsoleGraphNode } from '../types/IConsoleGraphNode';
import { IConsoleEntryInfoConfirm, IConsoleEntryStateInfoConfirm, InfoConfirmSetConfirm, InfoConfirmType } from '../types/entries/InfoConfirm';
import { IConsoleEntryStateDynamicOutput } from '../types/entries/DynamicOutput';
import { IConsoleEntryOutput } from '../types/entries/Output';
import { IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu, RadioMenuFocusItem, RadioMenuSelectItem } from '../types/entries/RadioMenu';
import { RadioMenuOnKeyDown, TextPromptOnKeyDown } from '../../main/types/ConsoleInput';
import { IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt, TextPromptSetInputText, TextPromptTrySetContinued } from '../types/entries/TextPrompt';
import { IConsoleEntryTitleOutput } from '../types/entries/TitleOutput';
import { GlobalInsertOn, IKeyPress, ToggleGlobalInsert } from '../../shared/KeyPress';
import { KeyboardKey, KeysByKeyCode } from '../../shared/KeyboardKey';
import { RequestButton, RequestButtonElementState } from './RequestButton';
import { IConsoleEntryRequestButton, IConsoleEntryStateRequestButton, RequestButtonEndRequest, RequestButtonStartRequest, RequestButtonState } from '../types/entries/RequestButton';
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
        rv = <InfoConfirm
          idPrefix={entryCast.id}
          input={stateCast.input}
          title={entryCast.title}
          isConfirmed={stateCast.isConfirmed}
          buttonText={entryCast.confirmButtonText}
          confirmText={entryCast.confirmButtonConfirmedText}
          renderType={
            entryCast.inputType === InfoConfirmType.RawText ? InfoConfirmPropsRenderType.RawText :
            InfoConfirmPropsRenderType.Markdown
          }
          onConfirm={() => {
            const newGraph = graph.Clone();
            InfoConfirmSetConfirm(node.entry.id, newGraph, true);
            onUpdate(newGraph, true);
          }}
          onChildFocus={(focused, id) => {
            const newGraph = graph.Clone();
            EntrySetFocus(node.entry.id, id, newGraph, focused);
            onUpdate(newGraph, false);
          }}
        />;
      }
      break;
    case ConsoleEntryType.DynamicOutput:
      {
        const stateCast = node.state as IConsoleEntryStateDynamicOutput;
        rv = <Output text={stateCast.text}/>;
      }
      break;
    case ConsoleEntryType.RequestButton:
      {
        const entryCast = node.entry as IConsoleEntryRequestButton;
        const stateCast = node.state as IConsoleEntryStateRequestButton;
        const stateMap = (state: RequestButtonState) => {
          let rv;
          switch (state) {
            case RequestButtonState.Started:
              rv = RequestButtonElementState.Started;
              break;
            case RequestButtonState.NotStarted:
              rv = RequestButtonElementState.NotStarted;
              break;
            case RequestButtonState.Failed:
              rv = RequestButtonElementState.Failed;
              break;
            case RequestButtonState.Succeeded:
            default:
              rv = RequestButtonElementState.Succeeded;
              break;
          }

          return rv;
        };
        rv = <RequestButton
          ButtonText={entryCast.buttonText}
          State={stateMap(stateCast.state)}
          idPrefix={entryCast.id}
          OnChildFocus={(focus, id) => {
            const newGraph = graph.Clone();
            EntrySetFocus(node.entry.id, id, newGraph, focus);
            onUpdate(newGraph, false);
          }}
          OnRequestButtonClick={() => {
            let newGraph = graph.Clone();
            RequestButtonStartRequest(node.entry.id, newGraph);
            onUpdate(newGraph, true);
            entryCast.onStartRequest(newGraph, success => {
              let newNewGraph = newGraph.Clone();
              RequestButtonEndRequest(node.entry.id, newNewGraph, success);
              onUpdate(newNewGraph, true);
            });
          }}
        />
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
          idPrefix={entryCast.id}
          isMultiline={entryCast.isMultiline}
          promptText={entryCast.promptText}
          inputText={stateCast.userInputText}
          onTextChange={text => {
            const newGraph = graph.Clone();
            TextPromptSetInputText(node.entry.id, newGraph, text);
            onUpdate(newGraph, false);
          }}
          onContinue={() => {
            const newGraph = graph.Clone();
            TextPromptTrySetContinued(node.entry.id, newGraph, true);
            onUpdate(newGraph, true);
          }}
          onChildFocus={(focused, id) => {
            const newGraph = graph.Clone();
            EntrySetFocus(node.entry.id, id, newGraph, focused);
            onUpdate(newGraph, false);
          }}
          errorMessage={stateCast.errorText}/>;
      }
      break;
    default:
      break;
  }

  return rv;
}

function OnKeyDown(keyPress: IKeyPress, graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusNext: boolean) => void) {
  let preventDefault = false;
  
  switch (node.entry.type) {
    case ConsoleEntryType.RadioMenu:
      RadioMenuOnKeyDown(keyPress, graph, node, onUpdate);
      if (keyPress.Key === KeyboardKey.Enter || keyPress.Key === KeyboardKey.Space ||
        keyPress.Key === KeyboardKey.Up || keyPress.Key === KeyboardKey.Down ||
        keyPress.Key === KeyboardKey.Left || keyPress.Key === KeyboardKey.Right
      ) {
        preventDefault = true;
      }
      break;
    case ConsoleEntryType.TextPrompt:
      if (TextPromptOnKeyDown(keyPress, graph, node, onUpdate)) {
        preventDefault = true;
      }
      break;
    default:
      break;
  }

  return preventDefault;
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
      const focusedEntry = visibleNodes[visibleNodes.length - 1].entry;
      const focusedId = focusedEntry.id;
      let focusedElementId = undefined;
      if (focusedEntry.isFocusable) {
        focusedElementId = focusedId;
      }
      else if (focusedEntry.type === ConsoleEntryType.TextPrompt) {
        const entryCast = focusedEntry as IConsoleEntryTextPrompt;
        if (entryCast.isMultiline) {
          focusedElementId = `${focusedEntry.id}-textarea-input`
        }
        else {
          focusedElementId = `${focusedEntry.id}-text-input`;
        }
      }
      else if (focusedEntry.type === ConsoleEntryType.InfoConfirm) {
        focusedElementId = `${focusedEntry.id}-button`;
      }
      else if (focusedEntry.type === ConsoleEntryType.RequestButton) {
        focusedElementId = `${focusedEntry.id}-button`;
      }
      EntrySetFocus(focusedId, focusedElementId, newGraph, true);
    }
    props.onGraphUpdate(newGraph);
  };

  useEffect(() => {
    if (graph.FocusedElementId) {
      // let ableToFocus = true;
      // if (graph.FocusedNodeId) {
      //   const node = FindConsoleGraphNode(graph, graph.FocusedNodeId);
      //   if (node && !node.entry.isFocusable && node.entry.type !== ConsoleEntryType.TextPrompt) {
      //     ableToFocus = false;
      //   }
      // }
      const element = document.getElementById(graph.FocusedElementId);
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth'});
        element.focus({ preventScroll: false});
      }
    }
    else if (graph.FocusedNodeId) {
      const element = document.getElementById(graph.FocusedNodeId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth'});
      }
    }
  }, [graph.FocusedElementId, graph.FocusedNodeId]);

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
          EntrySetFocus(n.entry.id, document.activeElement?.id, newGraph, true);
          onUpdate(newGraph);
        }}
        onBlur={() => {
          const newGraph = graph.Clone();
          ConsoleGraphClearFocus(newGraph);
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
            if (OnKeyDown(keyPress, graph, n, onUpdate)) {
              e.preventDefault();
            }
          }
        }}>
          <div className="div__console-entry" role="presentation">
            {RenderEntry(graph, n, onUpdate)}
          </div>
      </div>)}
    </div>
  );
}
