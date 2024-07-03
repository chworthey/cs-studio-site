import { KeyboardKey } from "./KeyboardKey";

export let GlobalInsertOn = false;

export function ToggleGlobalInsert() {
  GlobalInsertOn = !GlobalInsertOn;
}

export interface IKeyPress {
  Key: KeyboardKey;
  IsShiftDown: boolean;
  IsControlDown: boolean;
  IsCapsDown: boolean;
  IsInsertDown: boolean;
}
