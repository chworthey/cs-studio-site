import { ConsoleEntryType } from "../../console/types/ConsoleEntryType";
import { IConsoleGraph } from "../../console/types/ConsoleGraph";
import { IConsoleEntryTextPrompt, FormType } from "../../console/types/entries/TextPrompt";
import { VirtualKeyboardPage, MaskModeType, IVirtualKeyboardConfig } from "../../keyboard/types/VirtualKeyboardTypes";
import { KeyboardKey } from "../../shared/KeyboardKey";


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
          KeyboardKey.Tab
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
                KeyboardKey.Up,
                KeyboardKey.Down
              ]
            };
            break;
          case FormType.General:
          default:
            config.KeyMask = {
              MaskModeType: MaskModeType.Disallowed,
              Keys: [
                KeyboardKey.Up,
                KeyboardKey.Down
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
          KeyboardKey.Tab,
          KeyboardKey.Shift,
          KeyboardKey.PageUp,
          KeyboardKey.PageDown,
          KeyboardKey.Num1,
          KeyboardKey.Num2,
          KeyboardKey.Num3,
          KeyboardKey.Num4,
          KeyboardKey.Num5,
          KeyboardKey.Num6,
          KeyboardKey.Num7,
          KeyboardKey.Num8,
          KeyboardKey.Num9,
          KeyboardKey.Num0,
          KeyboardKey.Up,
          KeyboardKey.Left,
          KeyboardKey.Down,
          KeyboardKey.Right,
          KeyboardKey.Enter,
          KeyboardKey.Space
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
          KeyboardKey.Tab,
          KeyboardKey.Shift,
          KeyboardKey.PageUp,
          KeyboardKey.PageDown,
          KeyboardKey.Enter,
          KeyboardKey.Up,
          KeyboardKey.Down,
          KeyboardKey.Home,
          KeyboardKey.End
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
          KeyboardKey.Tab,
          KeyboardKey.Shift,
          KeyboardKey.PageUp,
          KeyboardKey.PageDown
        ]
      };
      break;
    default:
      break;
  }

  return config;
};
