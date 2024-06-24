import { useEffect, useRef, useState } from 'react';
import { IVirtualKeyboard, KeysByAlpha, KeysByNum, KeysBySymbol, MaskModeType, VirtualKeyboardAction, VirtualKeyboardKey, VirtualKeyboardPage } from './VirtualKeyboardTypes';
import './VirtualKeyboard.css';

interface IVirtualKeyboardProps {
  Keyboard: IVirtualKeyboard;
  OnKeyboardUpdate(newKeyboard: IVirtualKeyboard): void;
}

const num = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0'
];

const alphaHigh = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p'
];

const symHigh = [
  '`',
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*'
];

const symMid = [
  '(',
  ')',
  '-',
  '_',
  '=',
  '+',
  '[',
  ']',
  '{',
  '}',
];

const symLow = [
  ';',
  ':',
  '\'',
  '"',
  ',',
  '.',
  '<',
  '>',
  '/',
  '?'
];

const alphaMid = [
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l'
];

const alphaLow = [
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm'
];

interface IKeyProps {
  Content: string;
  KeySize: number;
  WidthScale?: number;
  AdditionalClass?: string;
  IsActive?: boolean;
  OnClick(): void;
  IsEnabled: boolean;
}

function Key(props: IKeyProps) {
  let clss = 'div__key';
  if (props.IsActive) {
    clss += ' div__key--active';
  }
  if (!props.IsEnabled) {
    clss += ' div__key--disabled';
  }
  if (props.AdditionalClass) {
    clss += ` ${props.AdditionalClass}`;
  }

  const onClick = props.IsEnabled ? props.OnClick : undefined;

  return (
    <div 
      className={clss}
      style={{
      width: `${props.WidthScale ? Math.floor(props.KeySize * props.WidthScale) : props.KeySize}px`,
      height: `${props.KeySize}px`,
      fontSize: `${Math.floor(props.KeySize / 4)}px`}}
      onClick={onClick}>
      <div className="div__key-content">
        {props.Content}
      </div>
    </div>
  );
}

interface IDimensions {
  width: number;
  height: number;
}

function UseContainerDimensions(myRef: React.RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<IDimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current ? myRef.current.offsetWidth : 0,
      height: myRef.current ? myRef.current.offsetHeight: 0
    } as IDimensions)

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

export function VirtualKeyboard(props: IVirtualKeyboardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const keyboard = props.Keyboard;
  const config = props.Keyboard.Config;

  let maskKeys = new Set<VirtualKeyboardKey>(config.KeyMask?.Keys);
  const maskActions = new Set(config.ActionMask?.Actions);

  const keyAllowed = (key: VirtualKeyboardKey) => {
    let rv = true;
    if (config.KeyMask) {
      if (config.KeyMask.MaskModeType === MaskModeType.Allowed) {
        rv = maskKeys.has(key);
      }
      else { // Disallowed
        rv = !maskKeys.has(key);
      }
    }
    return rv;
  };
  const actionAllowed = (action: VirtualKeyboardAction) => {
    let rv = true;
    if (config.ActionMask) {
      if (config.ActionMask.MaskModeType === MaskModeType.Allowed) {
        rv = maskActions.has(action);
      }
      else { // Disallowed
        rv = !maskActions.has(action);
      }
    }
    return rv;
  };

  const dimensions = UseContainerDimensions(ref);
  const gapSize = 0.5;
  const tabKeyWidthScale = 1.33;
  const capsKeyWidthScale = 1.5;
  const shiftKeyWidthScale = 1.67;
  const enterKeyWidthScale = 2;
  const backspaceKeyWidthScale = 2.5;
  const actionKeyWidthScale = 1.5;
  const actionWidthScale = 2;

  const across = tabKeyWidthScale + 13 + gapSize;

  let spaceKeyWidthScale = across - 3 - enterKeyWidthScale - backspaceKeyWidthScale;

  if (keyboard.CurrentPage == VirtualKeyboardPage.Action) {
    spaceKeyWidthScale -= 1;
  }
  else {
    spaceKeyWidthScale -= actionKeyWidthScale;
  }

  const keySize = Math.floor(dimensions.width / across) - 1;

  const capitalized = (keyboard.IsCapsOn && !keyboard.IsShiftOn) || (!keyboard.IsCapsOn && keyboard.IsShiftOn);

  const onUpdate = (newKeyboard: IVirtualKeyboard) => {
    props.OnKeyboardUpdate(newKeyboard);
  };

  const alphaPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      <Key Content="TAB" KeySize={keySize} WidthScale={tabKeyWidthScale} OnClick={() => {
        const newKeyboard = keyboard.Clone();
        newKeyboard.OnKey(VirtualKeyboardKey.Tab);
        onUpdate(newKeyboard);
      }} IsEnabled={keyAllowed(VirtualKeyboardKey.Tab)}/>
      {alphaHigh.map(a => <Key
        key={a}
        Content={capitalized ? a.toUpperCase() : a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAlpha(capitalized ? a.toUpperCase() : a);
          newKeyboard.OnKey(KeysByAlpha.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsAlphaEnabled && keyAllowed(KeysByAlpha.get(a)!)}/>)}
    </div>
    <div className="div__keyboard-row">
      <Key Content="CAPS" KeySize={keySize} WidthScale={capsKeyWidthScale} IsActive={keyboard.IsCapsOn} OnClick={() => {
        const newKeyboard = keyboard.Clone();
        newKeyboard.OnCaps(!keyboard.IsCapsOn);
        newKeyboard.OnKey(VirtualKeyboardKey.Caps);
        onUpdate(newKeyboard);
      }} IsEnabled={keyAllowed(VirtualKeyboardKey.Caps)}/>
      {alphaMid.map(a => <Key
        key={a}
        Content={capitalized ? a.toUpperCase() : a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAlpha(capitalized ? a.toUpperCase() : a);
          newKeyboard.OnKey(KeysByAlpha.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsAlphaEnabled && keyAllowed(KeysByAlpha.get(a)!)}/>)}
    </div>
    <div className="div__keyboard-row">
      <Key Content="SHIFT" KeySize={keySize} WidthScale={shiftKeyWidthScale} IsActive={keyboard.IsShiftOn} OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnShift(!keyboard.IsShiftOn);
          onUpdate(newKeyboard);
        }} IsEnabled={keyAllowed(VirtualKeyboardKey.Shift)}/>
      {alphaLow.map(a => <Key
        key={a}
        Content={capitalized ? a.toUpperCase() : a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAlpha(capitalized ? a.toUpperCase() : a);
          newKeyboard.OnKey(KeysByAlpha.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsAlphaEnabled && keyAllowed(KeysByAlpha.get(a)!)}/>)}
    </div>
  </div>;

  const numPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      {num.map(a => <Key
        key={a}
        Content={a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnNum(a);
          newKeyboard.OnKey(KeysByNum.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsNumEnabled && keyAllowed(KeysByNum.get(a)!)}/>)}
    </div>
  </div>;

  const symPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      {symHigh.map(a => <Key
        key={a}
        Content={a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnSymbol(a);
          newKeyboard.OnKey(KeysBySymbol.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsSymbolsEnabled && keyAllowed(KeysBySymbol.get(a)!)}/>)}
    </div>
    <div className="div__keyboard-row">
      {symMid.map(a => <Key
        key={a}
        Content={a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnSymbol(a);
          newKeyboard.OnKey(KeysBySymbol.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsSymbolsEnabled && keyAllowed(KeysBySymbol.get(a)!)}/>)}
    </div>
    <div className="div__keyboard-row">
      {symLow.map(a => <Key
        key={a}
        Content={a}
        KeySize={keySize}
        OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnSymbol(a);
          newKeyboard.OnKey(KeysBySymbol.get(a)!);
          onUpdate(newKeyboard);
        }}
        IsEnabled={config.IsSymbolsEnabled && keyAllowed(KeysBySymbol.get(a)!)}/>)}
    </div>
  </div>;

  const actPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      <Key Content="CUT" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAction(VirtualKeyboardAction.Cut);
          onUpdate(newKeyboard);
        }} IsEnabled={actionAllowed(VirtualKeyboardAction.Cut)}/>
      <Key Content="COPY" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAction(VirtualKeyboardAction.Copy);
          onUpdate(newKeyboard);
        }} IsEnabled={actionAllowed(VirtualKeyboardAction.Copy)}/>
      <Key Content="PASTE" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAction(VirtualKeyboardAction.Paste);
          onUpdate(newKeyboard);
        }} IsEnabled={actionAllowed(VirtualKeyboardAction.Paste)}/>
    </div>
    <div className="div__keyboard-row">
      <Key Content="UNDO" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAction(VirtualKeyboardAction.Undo);
          onUpdate(newKeyboard);
        }} IsEnabled={actionAllowed(VirtualKeyboardAction.Undo)}/>
      <Key Content="REDO" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => {
          const newKeyboard = keyboard.Clone();
          newKeyboard.OnAction(VirtualKeyboardAction.Redo);
          onUpdate(newKeyboard);
        }} IsEnabled={actionAllowed(VirtualKeyboardAction.Redo)}/>
    </div>
  </div>;

  const displayPage = (page: VirtualKeyboardPage) => {
    switch(page) {
      case VirtualKeyboardPage.Numeric:
        return numPage;
      case VirtualKeyboardPage.Symbol:
        return symPage;
      case VirtualKeyboardPage.Action:
        return actPage;
      case VirtualKeyboardPage.Alpha:
      default:
        return alphaPage;
    }
  };

  const pageButtons = (page: VirtualKeyboardPage) => {
    switch (page) {
      case VirtualKeyboardPage.Numeric:
        return [
          <Key key={0} Content='CTRL' KeySize={keySize} WidthScale={actionKeyWidthScale} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Action);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsActionEnabled}/>,
          <Key key={1} Content='ABC' KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Alpha);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsAlphaEnabled}/>,
          <Key key={2} Content="!@#" KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Symbol);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsSymbolsEnabled}/>
        ];
      case VirtualKeyboardPage.Symbol:
        return [
          <Key key={0} Content='CTRL' KeySize={keySize} WidthScale={actionKeyWidthScale} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Action);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsActionEnabled}/>,
          <Key key={1} Content='ABC' KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Alpha);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsAlphaEnabled}/>,
          <Key key={2} Content="123" KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Numeric);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsNumEnabled}/>
        ];
      case VirtualKeyboardPage.Action:
        return [
          <Key key={0} Content='ABC' KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Alpha);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsAlphaEnabled}/>,
          <Key key={1} Content="123" KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Numeric);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsNumEnabled}/>,
          <Key key={2} Content="!@#" KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Symbol);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsSymbolsEnabled}/>
        ];
      case VirtualKeyboardPage.Alpha:
      default:
        return [
          <Key key={0} Content='CTRL' KeySize={keySize} WidthScale={actionKeyWidthScale} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Action);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsActionEnabled}/>,
          <Key key={1} Content="123" KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Numeric);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsNumEnabled}/>,
          <Key key={2} Content="!@#" KeySize={keySize} OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnPageChange(VirtualKeyboardPage.Symbol);
              onUpdate(newKeyboard);
            }} IsEnabled={config.IsSymbolsEnabled}/>
        ];
    }
  };

  return (
    <div ref={ref} className="div__keyboard">
      <div className='div__keyboard-col-container'>
        {displayPage(keyboard.CurrentPage)}
        <div className='div__keyboard-col'>
          <div className="div__keyboard-row">
            <Key Content="INS" KeySize={keySize} IsActive={keyboard.IsInsertOn} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnInsert(!keyboard.IsInsertOn);
                newKeyboard.OnKey(VirtualKeyboardKey.Insert);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.Insert)}/>
            <Key Content="HM" KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.Home);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.Home)}/>
            <Key Content="END" KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.End);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.End)}/>
          </div>
          <div className="div__keyboard-row">
            <Key Content="PU" KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.PageUp);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.PageUp)}/>
            <Key Content={"\u{25B2}"} KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.Up);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.Up)}/>
            <Key Content="PD" KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.PageDown);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.PageDown)}/>
          </div>
          <div className="div__keyboard-row">
            <Key Content={"\u{25C4}"} KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.Left);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.Left)}/>
            <Key Content={"\u{25BC}"} KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.Down);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.Down)}/>
            <Key Content={"\u{25BA}"} KeySize={keySize} OnClick={() => {
                const newKeyboard = keyboard.Clone();
                newKeyboard.OnKey(VirtualKeyboardKey.Right);
                onUpdate(newKeyboard);
              }} IsEnabled={keyAllowed(VirtualKeyboardKey.Right)}/>
          </div>
        </div>
      </div>
      <div className="div__keyboard-row">
        {pageButtons(keyboard.CurrentPage)}
        <Key Content="SPACE" KeySize={keySize} WidthScale={spaceKeyWidthScale} AdditionalClass="div__space-key"
          OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnKey(VirtualKeyboardKey.Space);
              onUpdate(newKeyboard);
            }} IsEnabled={keyAllowed(VirtualKeyboardKey.Space)}/>
        <Key Content="BACKSPACE" KeySize={keySize} WidthScale={backspaceKeyWidthScale}
          OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnKey(VirtualKeyboardKey.Backspace);
              onUpdate(newKeyboard);
            }} IsEnabled={keyAllowed(VirtualKeyboardKey.Backspace)}/>
        <Key Content="DEL" KeySize={keySize}
          OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnKey(VirtualKeyboardKey.Delete);
              onUpdate(newKeyboard);
            }} IsEnabled={keyAllowed(VirtualKeyboardKey.Delete)}/>
        <Key Content="ENTER" KeySize={keySize} WidthScale={enterKeyWidthScale}
          OnClick={() => {
              const newKeyboard = keyboard.Clone();
              newKeyboard.OnKey(VirtualKeyboardKey.Enter);
              onUpdate(newKeyboard);
            }} IsEnabled={keyAllowed(VirtualKeyboardKey.Enter)}/>
      </div>
    </div>
  );
}