import { NumByKey } from "../../keyboard/types/VirtualKeyboardTypes";
import { IConsoleGraph } from "../../console/types/ConsoleGraph";
import { IConsoleGraphNode } from "../../console/types/IConsoleGraphNode";
import { IConsoleEntryRadioMenu, IConsoleEntryStateRadioMenu, RadioMenuFocusItem, RadioMenuSelectItem } from "../../console/types/entries/RadioMenu";
import { IKeyPress } from "../../shared/KeyPress";
import { KeyboardKey } from "../../shared/KeyboardKey";

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
    case KeyboardKey.Down:
    case KeyboardKey.Right:
      {
        const i = entryCast.items.findIndex(i => i.id === stateCast.focusedItem);
        if (i >= 0) {
          onMenuItemFocus(entryCast.items[(i + 1) % entryCast.items.length].id);
        }
      }
      break;
    case KeyboardKey.Up:
    case KeyboardKey.Left:
      {
        const i = entryCast.items.findIndex(i => i.id === stateCast.focusedItem);
        if (i >= 0) {
          onMenuItemFocus(entryCast.items[
            (i - 1 + entryCast.items.length) % entryCast.items.length
          ].id);
        }
      }
      break;
    case KeyboardKey.Enter:
    case KeyboardKey.Space:
      if (stateCast.focusedItem) {
        onMenuItemSelect(stateCast.focusedItem);
      }
      break;
    case KeyboardKey.Num1:
    case KeyboardKey.Num2:
    case KeyboardKey.Num3:
    case KeyboardKey.Num4:
    case KeyboardKey.Num5:
    case KeyboardKey.Num6:
    case KeyboardKey.Num7:
    case KeyboardKey.Num8:
    case KeyboardKey.Num9:
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
