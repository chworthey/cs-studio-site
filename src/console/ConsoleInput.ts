import { IKeyPress, NumByKey, VirtualKeyboardKey } from "../keyboard/VirtualKeyboardTypes";
import { IConsoleGraph } from "./ConsoleGraph";
import { IConsoleGraphNode } from "./IConsoleGraphNode";
import { IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu, RadioMenuFocusItem, RadioMenuSelectItem } from "./entries/RadioMenu";

export function RadioMenuOnKeyDown(keyPress: IKeyPress, graph: IConsoleGraph, node: IConsoleGraphNode, onUpdate: (newGraph: IConsoleGraph, focusNext: boolean) => void) {
  const key = keyPress.Key;
  const entryCast = node.entry as IConsoleEntryRadioMenu;
  const stateCast = node.state as IConsoleEntryStateRadioMenu;

  const onMenuItemFocus = (id: string) => {
    const newGraph = graph.Clone();
    RadioMenuFocusItem(node.entry.id, newGraph, id);
    onUpdate(newGraph, false);
  };

  const onMenuItemSelect = (id: string) => {
    let newGraph = graph.Clone();
    RadioMenuFocusItem(node.entry.id, newGraph, id);
    RadioMenuSelectItem(node.entry.id, newGraph, id);
    onUpdate(newGraph, true);
  };

  switch (key) {
    case VirtualKeyboardKey.Down:
    case VirtualKeyboardKey.Right:
      {
        const i = entryCast.items.findIndex(i => i.id === stateCast.focusedItem);
        if (i >= 0) {
          onMenuItemFocus(entryCast.items[(i + 1) % entryCast.items.length].id);
        }
      }
      break;
    case VirtualKeyboardKey.Up:
    case VirtualKeyboardKey.Left:
      {
        const i = entryCast.items.findIndex(i => i.id === stateCast.focusedItem);
        if (i >= 0) {
          onMenuItemFocus(entryCast.items[
            (i - 1 + entryCast.items.length) % entryCast.items.length
          ].id);
        }
      }
      break;
    case VirtualKeyboardKey.Enter:
    case VirtualKeyboardKey.Space:
      if (stateCast.focusedItem) {
        onMenuItemSelect(stateCast.focusedItem);
      }
      break;
    case VirtualKeyboardKey.Num1:
    case VirtualKeyboardKey.Num2:
    case VirtualKeyboardKey.Num3:
    case VirtualKeyboardKey.Num4:
    case VirtualKeyboardKey.Num5:
    case VirtualKeyboardKey.Num6:
    case VirtualKeyboardKey.Num7:
    case VirtualKeyboardKey.Num8:
    case VirtualKeyboardKey.Num9:
      {
        const i = parseInt(NumByKey.get(key)!) - 1;
        if (i < entryCast.items.length) {
          onMenuItemSelect(entryCast.items[i].id);
        }
      }
      break;
    default:
      break;
  }
};
