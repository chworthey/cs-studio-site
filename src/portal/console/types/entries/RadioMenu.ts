import { IClonable } from "../../../shared/IClonable";
import { ConsoleEntryType } from "../ConsoleEntryType";
import { ConsoleGraphUpdateEntry, IConsoleGraph } from "../ConsoleGraph";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IConsoleGraphNode } from "../IConsoleGraphNode";
import { IRequirement } from "../IRequirement";

export interface IRadioMenuItem extends IClonable<IFactoryMenuItem> {
  id: string;
  text: string;
  additionalData: string | null;
};

export interface IConsoleEntryRadioMenu extends IConsoleEntry {
  type: ConsoleEntryType.RadioMenu;
  text: string;
  items: IRadioMenuItem[];
};

export interface IFactoryMenuItem {
  id: string;
  text: string;
  additionalData?: string;
};

export interface IConsoleEntryStateRadioMenu extends IConsoleEntryState {
  type: ConsoleEntryType.RadioMenu;
  activeItem: string | null;
  focusedItem: string | null;
}

export function RadioMenuSelectItem(entryId: string, graph: IConsoleGraph, itemId: string) {
  return ConsoleGraphUpdateEntry<IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu>(
    entryId,
    graph,
    state => { state.activeItem = itemId; }
  );
};

export function RadioMenuFocusItem(entryId: string, graph: IConsoleGraph, itemId: string) {
  return ConsoleGraphUpdateEntry<IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu>(
    entryId,
    graph,
    state => { state.focusedItem = itemId; }
  );
}

export function RadioMenuClear(entryId: string, graph: IConsoleGraph) {
  return ConsoleGraphUpdateEntry<IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu>(
    entryId,
    graph,
    state => { state.activeItem = null; }
  );
};

export function CreateRadioMenu(id: string, text: string, items: IFactoryMenuItem[], requirement: IRequirement | undefined = undefined) {
  const newEntry: IConsoleEntryRadioMenu = {
    type: ConsoleEntryType.RadioMenu,
    id: id,
    requirement: requirement,
    text: text,
    items: items.map(i => ({
      id: i.id,
      text: i.text,
      activated: false,
      additionalData: i.additionalData ? i.additionalData : null,
      Clone: function() { return {...this}; }
    } as IRadioMenuItem)),
    isFocusable: true,
    Clone: function() { return {...this, items: this.items.map(i => i.Clone())}; }
  };

  return newEntry;
};

export function CreateRadioMenuState(id: string) {
  const rv: IConsoleEntryStateRadioMenu = {
    id: id,
    type: ConsoleEntryType.RadioMenu,
    visible: true,
    activeItem: null,
    focusedItem: null,
    isFocused: false,
    Clone: function() { return {...this}; }
  };

  return rv;
}
