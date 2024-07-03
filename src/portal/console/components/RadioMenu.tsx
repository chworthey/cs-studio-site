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
    <div className="div__menu" role="radiogroup">
      <div className="div__menu-header">
        {props.text}
      </div>
      <div className="div__menu-items" role="presentation">
        {props.menuItems.map((item, i) => <div
          className={props.selectedItemId === item.id ?
            "div__menu-item div__menu-item--activated" :
            "div__menu-item"
          }
          key={i}
          onClick={() => {props.onMenuItemSelect(item.id)}}
          role="radio"
          aria-checked={props.focusedMenuItem === item.id}>
            <div aria-hidden={true} className={
              props.isFocused && props.focusedMenuItem === item.id ?
              "div__menu-item-bullet div__menu-item-bullet--focused" :
              "div__menu-item-bullet"}>&#x25BA;</div>
            <div>{item.text}</div>
          </div>)}
      </div>
    </div>
  );
}