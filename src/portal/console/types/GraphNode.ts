import { ConsoleEntryType } from "./ConsoleEntryType";
import { IConsoleEntryDynamicOutput, IConsoleEntryStateDynamicOutput } from "./entries/DynamicOutput";
import { IConsoleEntryInfoConfirm, IConsoleEntryStateInfoConfirm } from "./entries/InfoConfirm";
import { IConsoleEntryOutput, IConsoleEntryStateOutput } from "./entries/Output";
import { IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu } from "./entries/RadioMenu";
import { IConsoleEntryRequestButton, IConsoleEntryStateRequestButton } from "./entries/RequestButton";
import { IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt } from "./entries/TextPrompt";
import { IConsoleEntryTitleOutput, IConsoleEntryStateTitleOutput } from "./entries/TitleOutput";
import { IConsoleEntry } from "./IConsoleEntry";
import { IConsoleEntryState } from "./IConsoleEntryState";

export interface IConsoleGraphNode {
  entry: IConsoleEntry;
  state: IConsoleEntryState;
}

export interface IConsoleGraphNodeTyped<E extends IConsoleEntry, S extends IConsoleEntryState> {
  type: ConsoleEntryType;
  entry: E;
  state: S;
};

export type GraphNodeType =
  IConsoleGraphNodeOutput |
  IConsoleGraphNodeRadioMenu |
  IConsoleGraphNodeDynamicOutput |
  IConsoleGraphNodeTitleOutput |
  IConsoleGraphNodeInfoConfirm |
  IConsoleGraphNodeTextPrompt |
  IConsoleGraphNodeRequestButton;

export interface IConsoleGraphNodeOutput
  extends IConsoleGraphNodeTyped<IConsoleEntryOutput, IConsoleEntryStateOutput>
{
  type: ConsoleEntryType.Output;
};

export interface IConsoleGraphNodeRadioMenu
  extends IConsoleGraphNodeTyped<IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu>
{
  type: ConsoleEntryType.RadioMenu;
};

export interface IConsoleGraphNodeDynamicOutput
  extends IConsoleGraphNodeTyped<IConsoleEntryDynamicOutput, IConsoleEntryStateDynamicOutput>
{
  type: ConsoleEntryType.DynamicOutput;
};

export interface IConsoleGraphNodeTitleOutput
  extends IConsoleGraphNodeTyped<IConsoleEntryTitleOutput, IConsoleEntryStateTitleOutput>
{
  type: ConsoleEntryType.TitleOutput;
};

export interface IConsoleGraphNodeInfoConfirm
  extends IConsoleGraphNodeTyped<IConsoleEntryInfoConfirm, IConsoleEntryStateInfoConfirm>
{
  type: ConsoleEntryType.InfoConfirm;
};

export interface IConsoleGraphNodeTextPrompt
  extends IConsoleGraphNodeTyped<IConsoleEntryTextPrompt, IConsoleEntryStateTextPrompt>
{
  type: ConsoleEntryType.TextPrompt;
};

export interface IConsoleGraphNodeRequestButton
  extends IConsoleGraphNodeTyped<IConsoleEntryRequestButton, IConsoleEntryStateRequestButton>
{
  type: ConsoleEntryType.RequestButton;
};
