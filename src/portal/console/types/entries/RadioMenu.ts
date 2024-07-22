import { IClonable } from "../../../shared/IClonable";
import { ConsoleEntryType } from "../ConsoleEntryType";
import { IConsoleEntry } from "../IConsoleEntry";
import { IConsoleEntryState } from "../IConsoleEntryState";

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
};

export interface IEntryRadioMenuInit {
  Id: string;
  Text: string;
  Items: IFactoryMenuItem[];
  RequirementId?: string;
};

export function CreateRadioMenu(init: IEntryRadioMenuInit) {
  const newEntry: IConsoleEntryRadioMenu = {
    type: ConsoleEntryType.RadioMenu,
    id: init.Id,
    requirementId: init.RequirementId,
    text: init.Text,
    items: init.Items.map(i => ({
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
