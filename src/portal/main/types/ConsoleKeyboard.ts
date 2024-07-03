import { BaseVirtualKeyboard } from "../../keyboard/types/BaseVirtualKeyboard";
import { IConsoleGraph } from "../../console/types/ConsoleGraph";
import { CreateConsoleKeyboardConfig } from "./ConsoleKeyboardConfig";
import { VirtualKeyboardAction } from "../../keyboard/types/VirtualKeyboardTypes";
import { KeyboardKey } from "../../shared/KeyboardKey";

export class ConsoleKeyboard extends BaseVirtualKeyboard {
  private _graph: IConsoleGraph;
  private _onGraphUpdate: (graph: IConsoleGraph) => void;

  set Graph(graph: IConsoleGraph) {
    this._graph = graph.Clone();
    this.Config = CreateConsoleKeyboardConfig(this._graph);
    this.CurrentPage = this.Config.DefaultPage;
  }

  constructor(graph: IConsoleGraph, onGraphUpdate: (graph: IConsoleGraph) => void) {
    const newGraph = graph.Clone();
    const config = CreateConsoleKeyboardConfig(newGraph);
    super(config);
    this._graph = newGraph;
    this._onGraphUpdate = onGraphUpdate;
  }

  Clone(): ConsoleKeyboard {
    const clone = new ConsoleKeyboard(this._graph, this._onGraphUpdate);

    clone.IsShiftOn = this.IsShiftOn;
    clone.IsCapsOn = this.IsCapsOn;
    clone.IsInsertOn = this.IsInsertOn;
    clone.CurrentPage = this.CurrentPage;

    return clone;
  }

  OnShift(on: boolean): void {
    super.OnShift(on);
  }
  OnCaps(on: boolean): void {
    super.OnCaps(on);
  }
  OnInsert(on: boolean): void {
    super.OnInsert(on);
  }
  OnNum(_char: string): void {
  }

  OnAlpha(_char: string): void {
  }

  OnSymbol(_char: string): void {
  }
  OnKey(key: KeyboardKey): void {
    super.OnKey(key);

    if (key === KeyboardKey.Tab) {
      
    }
  }
  OnAction(_action: VirtualKeyboardAction): void {
  }
};
