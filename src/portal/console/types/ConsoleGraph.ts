import { IClonable } from "../../shared/IClonable";
import { ConsoleEntryType } from "./ConsoleEntryType";
import { IConsoleEntry } from "./IConsoleEntry";
import { IConsoleEntryState } from "./IConsoleEntryState";
import { 
  ActionGraphClearFocus,
  IActionGraphSetFocusInit,
  ActionGraphSetFocus,
  IActionInfoConfirmSetConfirmInit,
  ActionInfoConfirmSetConfirm,
  IActionRadioMenuSelectItemInit,
  ActionRadioMenuSelectItem,
  IActionRadioMenuClearInit,
  ActionRadioMenuClear,
  IActionRadioMenuFocusItemInit,
  ActionRadioMenuFocusItem,
  IActionRequestButtonStartRequestInit,
  ActionRequestButtonStartRequest,
  IActionRequestButtonEndRequestInit,
  ActionRequestButtonEndRequest,
  IActionTextPromptSetInputTextInit,
  ActionTextPromptSetInputText,
  IActionTextPromptSetContinuedInit,
  ActionTextPromptSetContinued,
  IConsoleGraphAction,
  ActionType,
  ActionResultType,
  IActionResult,
  IActionGraphSetLoggedInInit,
  ActionGraphSetLoggedIn
} from "./GraphAction";
import { GraphNodeType, IConsoleGraphNode } from "./GraphNode";
import { CreateDynamicOutputState, CreateDynamicOutput, IEntryDynamicOutputInit, UpdateDynamicOutput } from "./entries/DynamicOutput";
import { CreateInfoConfirm, CreateInfoConfirmState, IEntryInfoConfirmInit, UpdateInfoConfirm } from "./entries/InfoConfirm";
import { CreateOutput, CreateOutputState, IEntryOutputInit } from "./entries/Output";
import { CreateRadioMenu, CreateRadioMenuState, IEntryRadioMenuInit } from "./entries/RadioMenu";
import { CreateRequestButton, CreateRequestButtonState, IEntryRequestButtonInit } from "./entries/RequestButton";
import { CreateTextPrompt, CreateTextPromptState, IEntryTextPromptInit } from "./entries/TextPrompt";
import { CreateTitleOutput, CreateTitleOutputState, IEntryTitleOutputInit } from "./entries/TitleOutput";

export type EntryData =
  IEntryDataDynamicOutput |
  IEntryDataInfoConfirm |
  IEntryDataOutput |
  IEntryDataRadioMenu |
  IEntryDataRequestButton |
  IEntryDataTextPrompt |
  IEntryDataTitleOutput;

export interface IEntryData<T> {
  Type: ConsoleEntryType;
  Data: T;
};

export interface IEntryDataDynamicOutput extends IEntryData<IEntryDynamicOutputInit> {
  Type: ConsoleEntryType.DynamicOutput;
};

export interface IEntryDataInfoConfirm extends IEntryData<IEntryInfoConfirmInit> {
  Type: ConsoleEntryType.InfoConfirm;
};

export interface IEntryDataOutput extends IEntryData<IEntryOutputInit> {
  Type: ConsoleEntryType.Output;
};

export interface IEntryDataRadioMenu extends IEntryData<IEntryRadioMenuInit> {
  Type: ConsoleEntryType.RadioMenu;
};

export interface IEntryDataRequestButton extends IEntryData<IEntryRequestButtonInit> {
  Type: ConsoleEntryType.RequestButton;
};

export interface IEntryDataTextPrompt extends IEntryData<IEntryTextPromptInit> {
  Type: ConsoleEntryType.TextPrompt;
};

export interface IEntryDataTitleOutput extends IEntryData<IEntryTitleOutputInit> {
  Type: ConsoleEntryType.TitleOutput;
};

export const entryFactory = {
  CreateEntryDynamicOutput(init: IEntryDynamicOutputInit): IConsoleEntry {
    return CreateDynamicOutput(init);
  },
  CreateEntryInfoConfirm(init: IEntryInfoConfirmInit): IConsoleEntry {
    return CreateInfoConfirm(init);
  },
  CreateEntryOutput(init: IEntryOutputInit): IConsoleEntry {
    return CreateOutput(init);
  },
  CreateEntryRadioMenu(init: IEntryRadioMenuInit): IConsoleEntry {
    return CreateRadioMenu(init);
  },
  CreateEntryRequestButton(init: IEntryRequestButtonInit): IConsoleEntry {
    return CreateRequestButton(init);
  },
  CreateEntryTextPrompt(init: IEntryTextPromptInit): IConsoleEntry {
    return CreateTextPrompt(init);
  },
  CreateEntryTitleOutput(init: IEntryTitleOutputInit): IConsoleEntry {
    return CreateTitleOutput(init);
  }
};

export type ActionData =
  IActionDataGraphClearFocus |
  IActionDataGraphSetFocus |
  IActionDataGraphSetLoggedIn |
  IActionDataInfoConfirmSetConfirm |
  IActionDataRadioMenuSelectItem |
  IActionDataRadioMenuClear |
  IActionDataInfoConfirmSetConfirm |
  IActionDataRadioMenuFocusItem |
  IActionDataRequestButtonStartRequest |
  IActionDataRequestButtonEndRequest |
  IActionDataTextPromptSetInputText |
  IActionDataTextPromptSetContinued;


export interface IActionData<T> {
  Type: ActionType;
  Data: T;
};

export interface IActionDataGraphClearFocus extends IActionData<undefined> {
  Type: ActionType.GraphClearFocus;
};

export interface IActionDataGraphSetFocus extends IActionData<IActionGraphSetFocusInit> {
  Type: ActionType.GraphSetFocus;
};

export interface IActionDataGraphSetLoggedIn extends IActionData<IActionGraphSetLoggedInInit> {
  Type: ActionType.GraphSetLoggedIn;
};

export interface IActionDataInfoConfirmSetConfirm extends IActionData<IActionInfoConfirmSetConfirmInit> {
  Type: ActionType.InfoConfirmSetConfirm;
};

export interface IActionDataRadioMenuSelectItem extends IActionData<IActionRadioMenuSelectItemInit> {
  Type: ActionType.RadioMenuSelectItem;
};

export interface IActionDataRadioMenuClear extends IActionData<IActionRadioMenuClearInit> {
  Type: ActionType.RadioMenuClear;
};

export interface IActionDataInfoConfirmSetConfirm extends IActionData<IActionInfoConfirmSetConfirmInit> {
  Type: ActionType.InfoConfirmSetConfirm;
};

export interface IActionDataRadioMenuFocusItem extends IActionData<IActionRadioMenuFocusItemInit> {
  Type: ActionType.RadioMenuFocusItem;
};

export interface IActionDataRequestButtonStartRequest extends IActionData<IActionRequestButtonStartRequestInit> {
  Type: ActionType.RequestButtonStartRequest;
};

export interface IActionDataRequestButtonEndRequest extends IActionData<IActionRequestButtonEndRequestInit> {
  Type: ActionType.RequestButtonEndRequest;
};

export interface IActionDataTextPromptSetInputText extends IActionData<IActionTextPromptSetInputTextInit> {
  Type: ActionType.TextPromptSetInputText;
};

export interface IActionDataTextPromptSetContinued extends IActionData<IActionTextPromptSetContinuedInit> {
  Type: ActionType.TextPromptSetContinued;
};

const actionFactory = {
  CreateActionGraphClearFocus(): IConsoleGraphAction {
    return new ActionGraphClearFocus();
  },
  CreateActionGraphSetFocus(init: IActionGraphSetFocusInit): IConsoleGraphAction {
    return new ActionGraphSetFocus(init);
  },
  CreateActionGraphSetLoggedIn(init: IActionGraphSetLoggedInInit): IConsoleGraphAction {
    return new ActionGraphSetLoggedIn(init);
  },
  CreateActionInfoConfirmSetConfirm(init: IActionInfoConfirmSetConfirmInit): IConsoleGraphAction {
    return new ActionInfoConfirmSetConfirm(init);
  },
  CreateActionRadioMenuSelectItem(init: IActionRadioMenuSelectItemInit): IConsoleGraphAction {
    return new ActionRadioMenuSelectItem(init);
  },
  CreateActionRadioMenuClear(init: IActionRadioMenuClearInit): IConsoleGraphAction {
    return new ActionRadioMenuClear(init);
  },
  CreateActionRadioMenuFocusItem(init: IActionRadioMenuFocusItemInit): IConsoleGraphAction {
    return new ActionRadioMenuFocusItem(init);
  },
  CreateActionRequestButtonStartRequest(init: IActionRequestButtonStartRequestInit): IConsoleGraphAction {
    return new ActionRequestButtonStartRequest(init);
  },
  CreateActionRequestButtonEndRequest(init: IActionRequestButtonEndRequestInit): IConsoleGraphAction {
    return new ActionRequestButtonEndRequest(init);
  },
  CreateActionTextPromptSetInputText(init: IActionTextPromptSetInputTextInit): IConsoleGraphAction {
    return new ActionTextPromptSetInputText(init);
  },
  CreateActionTextPromptSetContinued(init: IActionTextPromptSetContinuedInit): IConsoleGraphAction {
    return new ActionTextPromptSetContinued(init);
  }
};

export interface IConsoleGraph extends IClonable<IConsoleGraph> {
  NodesById: Map<string, IConsoleGraphNode>;
  FocusedNodeId?: string;
  FocusedElementId?: string;
  IsLoggedIn: boolean;
  FindNode<T extends GraphNodeType>(entryId: string): T | undefined;
  ExecuteAction(actionData: ActionData): IActionResult;
};

export interface IConsoleGraphInit {
  Entries: EntryData[];
  Requirements: RequirementData[];
}

export class ConsoleGraph implements IConsoleGraph {
  NodesById: Map<string, IConsoleGraphNode>;
  FocusedNodeId?: string;
  FocusedElementId?: string;
  IsLoggedIn: boolean;

  private createAction(action: ActionData) {
    let rv: IConsoleGraphAction;

    switch (action.Type) {
      case ActionType.GraphClearFocus:
        rv = actionFactory.CreateActionGraphClearFocus();
        break;
      case ActionType.GraphSetFocus:
        rv = actionFactory.CreateActionGraphSetFocus(action.Data as IActionGraphSetFocusInit);
        break;
      case ActionType.GraphSetLoggedIn:
        rv = actionFactory.CreateActionGraphSetLoggedIn(action.Data as IActionGraphSetLoggedInInit);
        break;
      case ActionType.InfoConfirmSetConfirm:
        rv = actionFactory.CreateActionInfoConfirmSetConfirm(action.Data as IActionInfoConfirmSetConfirmInit);
        break;
      case ActionType.RadioMenuClear:
        rv = actionFactory.CreateActionRadioMenuClear(action.Data as IActionRadioMenuClearInit);
        break;
      case ActionType.RadioMenuFocusItem:
        rv = actionFactory.CreateActionRadioMenuFocusItem(action.Data as IActionRadioMenuFocusItemInit);
        break;
      case ActionType.RadioMenuSelectItem:
        rv = actionFactory.CreateActionRadioMenuSelectItem(action.Data as IActionRadioMenuSelectItemInit);
        break;
      case ActionType.RequestButtonEndRequest:
        rv = actionFactory.CreateActionRequestButtonEndRequest(action.Data as IActionRequestButtonEndRequestInit);
        break;
      case ActionType.RequestButtonStartRequest:
        rv = actionFactory.CreateActionRequestButtonStartRequest(action.Data as IActionRequestButtonStartRequestInit);
        break;
      case ActionType.TextPromptSetContinued:
        rv = actionFactory.CreateActionTextPromptSetContinued(action.Data as IActionTextPromptSetContinuedInit);
        break;
      case ActionType.TextPromptSetInputText:
      default:
        rv = actionFactory.CreateActionTextPromptSetInputText(action.Data as IActionTextPromptSetInputTextInit);
        break;
    }

    return rv;
  }

  private createEntry(entry: EntryData) {
    let rv: IConsoleEntry;
    switch (entry.Type) {
      case ConsoleEntryType.InfoConfirm:
        rv = entryFactory.CreateEntryInfoConfirm(entry.Data as IEntryInfoConfirmInit);
        break;
      case ConsoleEntryType.DynamicOutput:
        rv = entryFactory.CreateEntryDynamicOutput(entry.Data as IEntryDynamicOutputInit);
        break;
      case ConsoleEntryType.RadioMenu:
        rv = entryFactory.CreateEntryRadioMenu(entry.Data as IEntryRadioMenuInit);
        break;
      case ConsoleEntryType.TextPrompt:
        rv = entryFactory.CreateEntryTextPrompt(entry.Data as IEntryTextPromptInit);
        break;
      case ConsoleEntryType.RequestButton:
        rv = entryFactory.CreateEntryRequestButton(entry.Data as IEntryRequestButtonInit);
        break;
      case ConsoleEntryType.TitleOutput:
        rv = entryFactory.CreateEntryTitleOutput(entry.Data as IEntryTitleOutputInit);
        break;
      case ConsoleEntryType.Output:
      default:
        rv = entryFactory.CreateEntryOutput(entry.Data as IEntryOutputInit);
        break;
    }
  
    return rv;
  }

  private createEntryState(entry: IConsoleEntry) {
    let rv: IConsoleEntryState;
    switch (entry.type) {
      case ConsoleEntryType.InfoConfirm:
        rv = CreateInfoConfirmState(entry.id);
        break;
      case ConsoleEntryType.DynamicOutput:
        rv = CreateDynamicOutputState(entry.id);
        break;
      case ConsoleEntryType.RadioMenu:
        rv = CreateRadioMenuState(entry.id);
        break;
      case ConsoleEntryType.TextPrompt:
        rv = CreateTextPromptState(entry.id);
        break;
      case ConsoleEntryType.RequestButton:
        rv = CreateRequestButtonState(entry.id);
        break;
      case ConsoleEntryType.TitleOutput:
        rv = CreateTitleOutputState(entry.id);
        break;
      case ConsoleEntryType.Output:
      default:
        rv = CreateOutputState(entry.id);
        break;
    }
  
    return rv;
  }

  constructor(entryData?: EntryData[]) {

    this.IsLoggedIn = false;

    if (entryData) {
      const entries = entryData.map(e => this.createEntry(e));
      const state: IConsoleEntryState[] = entries.map(e => this.createEntryState(e));

      const nodes = entries.map((e, i) => ({
        entry: e,
        state: state[i]
      }));

      this.NodesById = new Map<string, IConsoleGraphNode>(nodes.map((n => [n.entry.id, n])));
      this.update();
    }
    else {
      this.NodesById = new Map<string, IConsoleGraphNode>();
    }
  }

  private update() {
    for (let node of this.NodesById.values()) {
      switch (node.entry.type) {
        case ConsoleEntryType.InfoConfirm:
          UpdateInfoConfirm(this, node);
          break;
        case ConsoleEntryType.DynamicOutput:
          UpdateDynamicOutput(this, node);
          break;
        default:
          break;
      }
  
      if (node.entry.requirement) {
        node.state.visible = node.entry.requirement.RequirementMet(this);
      }
      else {
        node.state.visible = true;
      }
    }
  }

  Clone(): ConsoleGraph {
    const newNodes: IConsoleGraphNode[] = [];
    for (let value of this.NodesById.values()) {
      newNodes.push({
        entry: value.entry.Clone(),
        state: value.state.Clone(),
      });
    }

    const rv = new ConsoleGraph();
    rv.NodesById = new Map<string, IConsoleGraphNode>(newNodes.map(n => [n.entry.id, n]));
    rv.FocusedNodeId = this.FocusedNodeId;
    rv.FocusedElementId = this.FocusedElementId;
    rv.IsLoggedIn = this.IsLoggedIn;

    return rv;
  }

  FindNode<T extends GraphNodeType>(entryId: string) {
    const node = this.NodesById.get(entryId);
    if (node) {
      const rv = {
        type: node.entry.type,
        entry: node.entry,
        state: node.state
      } as T;
      return rv;
    }

    return undefined;
  }

  // private updateAllEntries(updateFunc: (state: IConsoleEntryState, entry: IConsoleEntry) => void) {
  //   for (let value of this.NodesById.values()) {
  //     updateFunc(value.state, value.entry)
  //   }
  //   this.Update();
  // }

  ExecuteAction(actionData: ActionData): IActionResult {
    const action = this.createAction(actionData);
    const result = action.ActionDo(this);

    if (result.Result === ActionResultType.Success) {
      this.update();
    }

    return result;
  }
};
