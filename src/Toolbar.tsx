import './Toolbar.css';

interface IToolbarProps {
  KeyboardShown: boolean;
  OnShowKeyboardToggle(value: boolean): void;
  OnGoHomeClick(): void;
}

export function Toolbar(props: IToolbarProps) {
  return (
    <div className="div__toolbar">
      <div
        className={props.KeyboardShown ? 'div__tool div__tool--active' : 'div__tool'}
        onClick={() => props.OnShowKeyboardToggle(!props.KeyboardShown)}>
        Show Keyboard
      </div>
      <div
        className="div__tool"
        onClick={props.OnGoHomeClick}>
        Go Home
      </div>
    </div>
  )
};
