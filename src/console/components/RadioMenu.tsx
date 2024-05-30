interface IRadioMenuPropsItem {
  text: string;
  id: string;
}

interface IRadioMenuProps {
  text: string;
  menuItems: IRadioMenuPropsItem[];
  onMenuItemSelect: (id: string) => void;
  selectedItemId: string | undefined;
}

export function RadioMenu(props: IRadioMenuProps) {
  return (
    <div className="div__menu">
      <div className="div__menu-header">
        <h2>{props.text}</h2>
      </div>
      <div className="div__menu-items">
        {props.menuItems.map((item, i) => <div className="div__menu-item" key={i}>
          <button
            className={props.selectedItemId === item.id ?
              "button__menu-item button__menu-item--activated" :
              "button__menu-item"
            }
            onClick={() => {props.onMenuItemSelect(item.id)}}>
            {item.text}
          </button>
        </div>)}
      </div>
    </div>
  );
}