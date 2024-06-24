import { ConsoleEntryType } from "./ConsoleEntryType";
import { IVirtualKeyboardConfig, MaskModeType, VirtualKeyboardKey, VirtualKeyboardPage } from "../keyboard/VirtualKeyboardTypes";
import { FormType, IConsoleEntryTextPrompt } from "./entries/TextPrompt";
import { IConsoleGraph } from "./ConsoleGraph";

export function CreateConsoleKeyboardConfig(graph: IConsoleGraph) {

  if (!graph.FocusedNodeId) {
    return {
      IsActionEnabled: false,
      IsAlphaEnabled: true,
      IsNumEnabled: false,
      IsSymbolsEnabled: false,
      DefaultPage: VirtualKeyboardPage.Alpha,
      KeyMask: {
        MaskModeType: MaskModeType.Allowed,
        Keys: [
          VirtualKeyboardKey.Tab
        ]
      },
      Clone: function () {return {...this}}
    } as IVirtualKeyboardConfig;
  }

  const node = graph.NodesById.get(graph.FocusedNodeId)!;
  const entry = node.entry;

  const config: IVirtualKeyboardConfig = {
    IsActionEnabled: true,
    IsAlphaEnabled: true,
    IsNumEnabled: true,
    IsSymbolsEnabled: true,
    DefaultPage: VirtualKeyboardPage.Alpha,
    Clone: function () {return {...this}}
  };

  switch(entry.type) {
    case ConsoleEntryType.TextPrompt:
      {
        const entryCast = entry as IConsoleEntryTextPrompt;
        switch (entryCast.formType) {
          case FormType.Name:
            config.IsSymbolsEnabled = false;
            config.IsNumEnabled = false;
            config.KeyMask = {
              MaskModeType: MaskModeType.Disallowed,
              Keys: [
                VirtualKeyboardKey.Up,
                VirtualKeyboardKey.Down
              ]
            };
            break;
          case FormType.General:
          default:
            config.KeyMask = {
              MaskModeType: MaskModeType.Disallowed,
              Keys: [
                VirtualKeyboardKey.Up,
                VirtualKeyboardKey.Down
              ]
            };
            break;
        }
      }
      break;
    case ConsoleEntryType.RadioMenu:
      config.IsSymbolsEnabled = false;
      config.IsAlphaEnabled = false;
      config.IsActionEnabled = false;
      config.DefaultPage = VirtualKeyboardPage.Numeric;
      config.KeyMask = {
        MaskModeType: MaskModeType.Allowed,
        Keys: [
          VirtualKeyboardKey.Tab,
          VirtualKeyboardKey.Shift,
          VirtualKeyboardKey.PageUp,
          VirtualKeyboardKey.PageDown,
          VirtualKeyboardKey.Num1,
          VirtualKeyboardKey.Num2,
          VirtualKeyboardKey.Num3,
          VirtualKeyboardKey.Num4,
          VirtualKeyboardKey.Num5,
          VirtualKeyboardKey.Num6,
          VirtualKeyboardKey.Num7,
          VirtualKeyboardKey.Num8,
          VirtualKeyboardKey.Num9,
          VirtualKeyboardKey.Num0,
          VirtualKeyboardKey.Up,
          VirtualKeyboardKey.Left,
          VirtualKeyboardKey.Down,
          VirtualKeyboardKey.Right,
          VirtualKeyboardKey.Enter,
          VirtualKeyboardKey.Space
        ]
      };
      break;
    case ConsoleEntryType.InfoConfirm:
      config.IsSymbolsEnabled = false;
      config.IsAlphaEnabled = false;
      config.IsNumEnabled = false;
      config.IsActionEnabled = false;
      config.KeyMask = {
        MaskModeType: MaskModeType.Allowed,
        Keys: [
          VirtualKeyboardKey.Tab,
          VirtualKeyboardKey.Shift,
          VirtualKeyboardKey.PageUp,
          VirtualKeyboardKey.PageDown,
          VirtualKeyboardKey.Enter,
          VirtualKeyboardKey.Up,
          VirtualKeyboardKey.Down,
          VirtualKeyboardKey.Home,
          VirtualKeyboardKey.End
        ]
      };
      break;
    case ConsoleEntryType.TitleOutput:
    case ConsoleEntryType.DynamicOutput:
    case ConsoleEntryType.Output:
      config.IsSymbolsEnabled = false;
      config.IsAlphaEnabled = false;
      config.IsNumEnabled = false;
      config.IsActionEnabled = false;
      config.KeyMask = {
        MaskModeType: MaskModeType.Allowed,
        Keys: [
          VirtualKeyboardKey.Tab,
          VirtualKeyboardKey.Shift,
          VirtualKeyboardKey.PageUp,
          VirtualKeyboardKey.PageDown
        ]
      };
      break;
    default:
      break;
  }

  return config;
};
