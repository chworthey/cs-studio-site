import '../styles/Toolbar.css';

interface IToolbarProps {
  // KeyboardShown: boolean;
  // OnShowKeyboardToggle(value: boolean): void;
  NekoShown: boolean;
  OnShowNekoToggle(value: boolean): void;
  OnGoHomeClick(): void;
}

export function Toolbar(props: IToolbarProps) {
  return (
    <div className="div__toolbar" role="presentation">
      {/* <div
        className={props.KeyboardShown ? 'div__tool div__tool--active' : 'div__tool'}
        onClick={() => props.OnShowKeyboardToggle(!props.KeyboardShown)}>
        Show Keyboard
      </div> */}
      <button
        aria-pressed={props.NekoShown}
        className={props.NekoShown ? 'div__tool div__tool--active' : 'div__tool'}
        onClick={() => props.OnShowNekoToggle(!props.NekoShown)}>
        Toggle Neko
      </button>
      <button
        className="div__tool"
        onClick={props.OnGoHomeClick}>
        Go Home
      </button>
    </div>
  )
};
