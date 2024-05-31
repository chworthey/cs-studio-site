import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";
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
}

export function RadioMenuSelectItem(state: IConsoleEntryStateRadioMenu, itemId: string) {
  state.activeItem = itemId;
};

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
    }))
  };

  return newEntry;
};

export function CreateRadioMenuState(id: string) {
  const rv: IConsoleEntryStateRadioMenu = {
    id: id,
    type: ConsoleEntryType.RadioMenu,
    visible: true,
    activeItem: null
  };

  return rv;
}
