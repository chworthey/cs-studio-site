import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
import { IConsoleGraphNode } from "../IConsoleGraphNode";
import { IRequirement } from "../IRequirement";

export interface IRadioMenuItem {
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

export function RadioMenuSelectItem(state: IConsoleEntryStateRadioMenu, itemId: string) {
  state.activeItem = itemId;
};

export function RadioMenuFocusItem(state: IConsoleEntryStateRadioMenu, itemId: string) {
  state.focusedItem = itemId;
}

export function RadioMenuClear(state: IConsoleEntryStateRadioMenu) {
  state.activeItem = null;
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
      additionalData: i.additionalData ? i.additionalData : null
    })),
    isFocusable: true
  };

  return newEntry;
};

export function UpdateRadioMenu(node: IConsoleGraphNode) {
  if (node.entry.type === ConsoleEntryType.RadioMenu &&
    node.state.type === ConsoleEntryType.RadioMenu
  ) {
    const entryCast = node.entry as IConsoleEntryRadioMenu;
    const stateCast = node.state as IConsoleEntryStateRadioMenu;
    if (!stateCast.focusedItem && entryCast.items.length > 0) {
      stateCast.focusedItem = entryCast.items[0].id;
    }
  }
}

export function CreateRadioMenuState(id: string) {
  const rv: IConsoleEntryStateRadioMenu = {
    id: id,
    type: ConsoleEntryType.RadioMenu,
    visible: true,
    activeItem: null,
    focusedItem: null,
    isFocused: false
  };

  return rv;
}
