interface IRadioMenuPropsItem {
  text: string;
  id: string;
}

interface IRadioMenuProps {
  text: string;
  menuItems: IRadioMenuPropsItem[];
  onMenuItemSelect: (id: string) => void;
  selectedItemId: string | undefined;
  focusedMenuItem: string | undefined;
  isFocused: boolean;
}

export function RadioMenu(props: IRadioMenuProps) {
  return (
    <div className="div__radio-menu" role="radiogroup">
      <div className="div__radio-menu-header">
        {props.text}
      </div>
      <div className="div__radio-menu-items" role="presentation">
        {props.menuItems.map((item, i) => <div
          className={props.selectedItemId === item.id ?
            "div__radio-menu-item div__radio-menu-item--activated" :
            "div__radio-menu-item"
          }
          key={i}
          onClick={() => {props.onMenuItemSelect(item.id)}}
          role="radio"
          aria-checked={props.focusedMenuItem === item.id}>
            <div aria-hidden={true} className={
              props.isFocused && props.focusedMenuItem === item.id ?
              "div__radio-menu-item-bullet div__radio-menu-item-bullet--focused" :
              "div__radio-menu-item-bullet"}>&#x25BA;</div>
            <div>{item.text}</div>
          </div>)}
      </div>
    </div>
  );
}