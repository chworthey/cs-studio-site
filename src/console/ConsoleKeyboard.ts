import { BaseVirtualKeyboard } from "../keyboard/BaseVirtualKeyboard";
import { IConsoleGraph } from "./ConsoleGraph";
import { CreateConsoleKeyboardConfig } from "./ConsoleKeyboardConfig";

export class ConsoleKeyboard extends BaseVirtualKeyboard {
  constructor(graph: IConsoleGraph) {
    const config = CreateConsoleKeyboardConfig(graph);
    super(config);
  }
};
