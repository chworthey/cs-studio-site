import { ConsoleEntryType } from "./ConsoleEntryType";
import { IConsoleGraph } from "./ConsoleGraph";
import { RequestButtonState } from "./entries/RequestButton";
import { ValidateTextInput } from "./entries/TextPrompt";
import { IConsoleGraphNodeInfoConfirm, IConsoleGraphNodeRadioMenu, IConsoleGraphNodeRequestButton, IConsoleGraphNodeTextPrompt } from "./GraphNode";

export enum ActionType {
  GraphClearFocus,
  GraphSetFocus,
  GraphSetLoggedIn,
  InfoConfirmSetConfirm,
  RadioMenuSelectItem,
  RadioMenuClear,
  RadioMenuFocusItem,
  RequestButtonStartRequest,
  RequestButtonEndRequest,
  TextPromptSetInputText,
  TextPromptSetContinued
};

export enum ActionResultType {
  Success,
  Failed
};

export interface IActionResult {
  Result: ActionResultType;
  ErrorMessage?: string;
};

export enum ConsoleGraphActionScope {
  EntryLevel,
  GraphLevel
};

export interface IConsoleGraphAction {
  Scope: ConsoleGraphActionScope;
  ActionDo(graph: IConsoleGraph): IActionResult;
};

export interface IConsoleGraphActionGraphLevel extends IConsoleGraphAction {
  Scope: ConsoleGraphActionScope.GraphLevel;
};

export interface IConsoleGraphActionEntryLevel extends IConsoleGraphAction {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
};

function failureMessageNodeFind(contextName: string, nodeId: string) {
  return `${contextName}: Failed to find node '${nodeId}'.`;
}

export class ActionGraphClearFocus implements IConsoleGraphActionGraphLevel {
  Scope: ConsoleGraphActionScope.GraphLevel;
  constructor() {
    this.Scope = ConsoleGraphActionScope.GraphLevel;
  }
  ActionDo(graph: IConsoleGraph): IActionResult {
    const nodeId = graph.FocusedNodeId;
    if (nodeId) {
      graph.FocusedNodeId = undefined;
      graph.FocusedElementId = undefined;
      const node = graph.FindNode(nodeId);
      if (node) {
        node.state.isFocused = false;
      }
    }

    return {
      Result: ActionResultType.Success
    };
  }
};

export interface IActionGraphSetFocusInit {
  EntryId: string;
  FocusElementId?: string | undefined;
  Focus: boolean;
};

export class ActionGraphSetFocus implements IConsoleGraphActionGraphLevel {
  Scope: ConsoleGraphActionScope.GraphLevel;
  private entryId: string;
  private focusElementId: string | undefined;
  private focus: boolean;
  constructor(init: IActionGraphSetFocusInit) {
    this.Scope = ConsoleGraphActionScope.GraphLevel;
    this.entryId = init.EntryId;
    this.focusElementId = init.FocusElementId;
    this.focus = init.Focus;
  }
  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode(this.entryId);
    if (node) {
      if (this.focus) {
        if (graph.FocusedNodeId) {
          const node = graph.FindNode(graph.FocusedNodeId);
          if (node) {
            node.state.isFocused = false;
          }
        }
        graph.FocusedNodeId = this.entryId;
        graph.FocusedElementId = this.focusElementId;
      }
      node.state.isFocused = node.entry.isFocusable ? this.focus : false;

      return {
        Result: ActionResultType.Success
      };
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('GraphSetFocus', this.entryId)
      };
    }
  }
};

export interface IActionGraphSetLoggedInInit {
  LoggedIn: boolean;
};

export class ActionGraphSetLoggedIn implements IConsoleGraphActionGraphLevel {
  Scope: ConsoleGraphActionScope.GraphLevel;
  private loggedIn: boolean;
  constructor(init: IActionGraphSetLoggedInInit) {
    this.Scope = ConsoleGraphActionScope.GraphLevel;
    this.loggedIn = init.LoggedIn;
  }
  ActionDo(graph: IConsoleGraph): IActionResult {
    graph.IsLoggedIn = this.loggedIn;

    return {
      Result: ActionResultType.Success
    };
  }
};

export interface IActionInfoConfirmSetConfirmInit {
  EntryId: string;
  IsConfirmed: boolean;
};

export class ActionInfoConfirmSetConfirm implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  private isConfirmed: boolean;
  constructor(init: IActionInfoConfirmSetConfirmInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
    this.isConfirmed = init.IsConfirmed;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeInfoConfirm>(this.entryId);
    if (node) {
      node.state.isConfirmed = this.isConfirmed;

      return {
        Result: ActionResultType.Success
      };
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('InfoConfirmSetConfirm', this.entryId)
      };
    }
  }
};

export interface IActionRadioMenuSelectItemInit {
  EntryId: string;
  ItemId: string;
};

export class ActionRadioMenuSelectItem implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  private itemId: string;
  constructor(init: IActionRadioMenuSelectItemInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
    this.itemId = init.ItemId;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeRadioMenu>(this.entryId);
    if (node) {
      if (node.entry.items.find(i => i.id === this.itemId)) {
        node.state.activeItem = this.itemId;

        return {
          Result: ActionResultType.Success
        };
      }
      else {
        return {
          Result: ActionResultType.Failed,
          ErrorMessage: `RadioMenuSelectItem: Failed to find radio menu item '${this.itemId}'.`
        };
      }
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('RadioMenuSelectItem', this.entryId)
      };
    }
  }
};

export interface IActionRadioMenuClearInit {
  EntryId: string;
};

export class ActionRadioMenuClear implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  constructor(init: IActionRadioMenuClearInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeRadioMenu>(this.entryId);
    if (node) {
      node.state.activeItem = null;
    }
    return {
      Result: ActionResultType.Success
    };
  }
};

export interface IActionRadioMenuFocusItemInit {
  EntryId: string;
  ItemId: string;
};

export class ActionRadioMenuFocusItem implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  private itemId: string;
  constructor(init: IActionRadioMenuFocusItemInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
    this.itemId = init.ItemId;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeRadioMenu>(this.entryId);
    if (node) {
      if (node.entry.items.find(i => i.id === this.itemId)) {
        node.state.focusedItem = this.itemId;

        return {
          Result: ActionResultType.Success
        };
      }
      else {
        return {
          Result: ActionResultType.Failed,
          ErrorMessage: `RadioMenuFocusItem: Failed to find radio menu item '${this.itemId}'.`
        };
      }
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('RadioMenuFocusItem', this.entryId)
      };
    }
  }
};

export interface IActionRequestButtonStartRequestInit {
  EntryId: string;
};

export class ActionRequestButtonStartRequest implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  constructor(init: IActionRequestButtonStartRequestInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeRequestButton>(this.entryId);
    if (node) {
      node.state.state = RequestButtonState.Started;

      return {
        Result: ActionResultType.Success
      };
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('RequestButtonStartRequest', this.entryId)
      };
    }
  }
};

export interface IActionRequestButtonEndRequestInit {
  EntryId: string;
  Success: boolean;
};

export class ActionRequestButtonEndRequest implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  private success: boolean;
  constructor(init: IActionRequestButtonEndRequestInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
    this.success = init.Success;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeRequestButton>(this.entryId);
    if (node) {
      node.state.state = this.success ? RequestButtonState.Succeeded : RequestButtonState.Failed;

      return {
        Result: ActionResultType.Success
      };
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('RequestButtonEndRequest', this.entryId)
      };
    }
  }
};

export interface IActionTextPromptSetInputTextInit {
  EntryId: string;
  Text: string;
};

export class ActionTextPromptSetInputText implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  private text: string;
  constructor(init: IActionTextPromptSetInputTextInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
    this.text = init.Text;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeTextPrompt>(this.entryId);
    if (node) {
      if (node.state.userInputText != this.text) {
        node.state.userInputText = this.text;
        node.state.continued = false;
      }

      return {
        Result: ActionResultType.Success
      };
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('TextPromptSetInputText', this.entryId)
      };
    }
  }
};

export interface IActionTextPromptSetContinuedInit {
  EntryId: string;
  Continued: boolean;
};

export class ActionTextPromptSetContinued implements IConsoleGraphActionEntryLevel {
  Scope: ConsoleGraphActionScope.EntryLevel;
  EntryType: ConsoleEntryType;
  private entryId: string;
  private continued: boolean;
  constructor(init: IActionTextPromptSetContinuedInit) {
    this.Scope = ConsoleGraphActionScope.EntryLevel;
    this.EntryType = ConsoleEntryType.InfoConfirm;
    this.entryId = init.EntryId;
    this.continued = init.Continued;
  }

  ActionDo(graph: IConsoleGraph): IActionResult {
    const node = graph.FindNode<IConsoleGraphNodeTextPrompt>(this.entryId);
    if (node) {
      if (this.continued) {
          const result = ValidateTextInput(node.state.userInputText, node.entry.formType);
          const errorText = result.Valid ? undefined : result.ErrorMessage;
          const continued = result.Valid;
          let inputText = node.state.userInputText;
          if (result.CorrectedText !== undefined) {
            inputText = result.CorrectedText;
          }
          node.state.continued = continued;
          node.state.errorText = errorText;
          node.state.userInputText = inputText;

          return {
            Result: ActionResultType.Success
          };
      }
      else {
        node.state.continued = false;

        return {
          Result: ActionResultType.Success
        };
      }
    }
    else {
      return {
        Result: ActionResultType.Failed,
        ErrorMessage: failureMessageNodeFind('TextPromptSetInputText', this.entryId)
      };
    }
  }
};
