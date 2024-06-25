import { IVirtualKeyboard, IVirtualKeyboardConfig, VirtualKeyboardAction, VirtualKeyboardKey, VirtualKeyboardPage } from "./VirtualKeyboardTypes";

export class BaseVirtualKeyboard implements IVirtualKeyboard {
  IsShiftOn: boolean;
  IsCapsOn: boolean;
  IsInsertOn: boolean;
  CurrentPage: VirtualKeyboardPage;
  Config: IVirtualKeyboardConfig;

  constructor(config: IVirtualKeyboardConfig) {
    this.IsShiftOn = false;
    this.IsCapsOn = false;
    this.IsInsertOn = false;
    this.CurrentPage = config.DefaultPage;
    this.Config = config;
  }
  Clone(): BaseVirtualKeyboard {
    const clone = new BaseVirtualKeyboard(this.Config.Clone());

    clone.IsShiftOn = this.IsShiftOn;
    clone.IsCapsOn = this.IsCapsOn;
    clone.IsInsertOn = this.IsInsertOn;
    clone.CurrentPage = this.CurrentPage;
    
    return clone;
  }

  OnShift(on: boolean): void {
    this.IsShiftOn = on;
  }
  OnCaps(on: boolean): void {
    this.IsCapsOn = on;
  }
  OnInsert(on: boolean): void {
    this.IsInsertOn = on;
  }
  OnPageChange(page: VirtualKeyboardPage): void {
    this.CurrentPage = page;
  }
  OnNum(_char: string): void {
  }

  OnAlpha(_char: string): void {
  }

  OnSymbol(_char: string): void {
  }
  OnKey(key: VirtualKeyboardKey): void {
    if (key === VirtualKeyboardKey.Tab) {
      this.IsShiftOn = false;
    }
  }
  OnAction(_action: VirtualKeyboardAction): void {
  }
}
