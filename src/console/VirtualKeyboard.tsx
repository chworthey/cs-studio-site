import { useEffect, useRef, useState } from 'react';
import './VirtualKeyboard.css'

export enum VirtualKeyboardPage {
  Alpha,
  Numeric,
  Symbol,
  Action
};

export enum VirtualKeyboardAction {
  Cut,
  Copy,
  Paste,
  Undo,
  Redo
}

interface IVirtualKeyboardProps {
  IsShiftOn: boolean;
  IsCapsOn: boolean;
  IsInsertOn: boolean;
  CurrentPage: VirtualKeyboardPage;
  OnShift(on: boolean): void;
  OnCaps(on: boolean): void;
  OnInsert(on: boolean): void;
  OnPageChange(page: VirtualKeyboardPage): void;
  OnTab(): void;
  OnSpace(): void;
  OnBackspace(): void;
  OnDelete(): void;
  OnEnter(): void;
  OnUp(): void;
  OnLeft(): void;
  OnDown(): void;
  OnRight(): void;
  OnHome(): void;
  OnEnd(): void;
  OnPageUp(): void;
  OnPageDown(): void;
  OnNum(char: string): void;
  OnAlpha(char: string): void;
  OnSymbol(char: string): void;
  OnAction(action: VirtualKeyboardAction): void;
  IsAlphaEnabled: boolean;
  IsSymbolEnabled: boolean;
  IsActionEnabled: boolean;
  IsNumEnabled: boolean;
  IsTabEnabled: boolean;
  IsCapsEnabled: boolean;
  IsShiftEnabled: boolean;
  IsSpaceEnabled: boolean;
  IsBackspaceEnabled: boolean;
  IsDeleteEnabled: boolean;
  IsEnterEnabled: boolean;
  IsInsertEnabled: boolean;
  IsHomeEnabled: boolean;
  IsEndEnabled: boolean;
  IsPageUpEnabled: boolean;
  IsPageDownEnabled: boolean;
  IsUpEnabled: boolean;
  IsLeftEnabled: boolean;
  IsDownEnabled: boolean;
  IsRightEnabled: boolean;
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

  if (props.CurrentPage == VirtualKeyboardPage.Action) {
    spaceKeyWidthScale -= 1;
  }
  else {
    spaceKeyWidthScale -= actionKeyWidthScale;
  }

  const keySize = Math.floor(dimensions.width / across) - 1;

  const capitalized = (props.IsCapsOn && !props.IsShiftOn) || (!props.IsCapsOn && props.IsShiftOn);

  const alphaPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      <Key Content="TAB" KeySize={keySize} WidthScale={tabKeyWidthScale} OnClick={props.OnTab} IsEnabled={props.IsTabEnabled}/>
      {alphaHigh.map(a => <Key key={a} Content={capitalized ? a.toUpperCase() : a} KeySize={keySize} OnClick={() => props.OnAlpha(capitalized ? a.toUpperCase() : a)} IsEnabled={props.IsAlphaEnabled}/>)}
    </div>
    <div className="div__keyboard-row">
      <Key Content="CAPS" KeySize={keySize} WidthScale={capsKeyWidthScale} IsActive={props.IsCapsOn} OnClick={() => props.OnCaps(!props.IsCapsOn)} IsEnabled={props.IsCapsEnabled}/>
      {alphaMid.map(a => <Key key={a} Content={capitalized ? a.toUpperCase() : a} KeySize={keySize} OnClick={() => props.OnAlpha(capitalized ? a.toUpperCase() : a)} IsEnabled={props.IsAlphaEnabled}/>)}
    </div>
    <div className="div__keyboard-row">
      <Key Content="SHIFT" KeySize={keySize} WidthScale={shiftKeyWidthScale} IsActive={props.IsShiftOn} OnClick={() => props.OnShift(!props.IsShiftOn)} IsEnabled={props.IsShiftEnabled}/>
      {alphaLow.map(a => <Key key={a} Content={capitalized ? a.toUpperCase() : a} KeySize={keySize} OnClick={() => props.OnAlpha(capitalized ? a.toUpperCase() : a)} IsEnabled={props.IsAlphaEnabled}/>)}
    </div>
  </div>;

  const numPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      {num.map(a => <Key key={a} Content={a} KeySize={keySize} OnClick={() => props.OnNum(a)} IsEnabled={props.IsNumEnabled}/>)}
    </div>
  </div>;

  const symPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      {symHigh.map(a => <Key key={a} Content={a} KeySize={keySize} OnClick={() => props.OnSymbol(a)} IsEnabled={props.IsSymbolEnabled}/>)}
    </div>
    <div className="div__keyboard-row">
      {symMid.map(a => <Key key={a} Content={a} KeySize={keySize} OnClick={() => props.OnSymbol(a)} IsEnabled={props.IsSymbolEnabled}/>)}
    </div>
    <div className="div__keyboard-row">
      {symLow.map(a => <Key key={a} Content={a} KeySize={keySize} OnClick={() => props.OnSymbol(a)} IsEnabled={props.IsSymbolEnabled}/>)}
    </div>
  </div>;

  const actPage = <div className='div__keyboard-col'>
    <div className="div__keyboard-row">
      <Key Content="CUT" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => props.OnAction(VirtualKeyboardAction.Cut)} IsEnabled={props.IsActionEnabled}/>
      <Key Content="COPY" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => props.OnAction(VirtualKeyboardAction.Copy)} IsEnabled={props.IsActionEnabled}/>
      <Key Content="PASTE" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => props.OnAction(VirtualKeyboardAction.Paste)} IsEnabled={props.IsActionEnabled}/>
    </div>
    <div className="div__keyboard-row">
      <Key Content="UNDO" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => props.OnAction(VirtualKeyboardAction.Undo)} IsEnabled={props.IsActionEnabled}/>
      <Key Content="REDO" WidthScale={actionWidthScale} KeySize={keySize} OnClick={() => props.OnAction(VirtualKeyboardAction.Redo)} IsEnabled={props.IsActionEnabled}/>
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
          <Key key={0} Content='CTRL' KeySize={keySize} WidthScale={actionKeyWidthScale} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Action)} IsEnabled={props.IsActionEnabled}/>,
          <Key key={1} Content='ABC' KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Alpha)} IsEnabled={props.IsAlphaEnabled}/>,
          <Key key={2} Content="!@#" KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Symbol)} IsEnabled={props.IsSymbolEnabled}/>
        ];
      case VirtualKeyboardPage.Symbol:
        return [
          <Key key={0} Content='CTRL' KeySize={keySize} WidthScale={actionKeyWidthScale} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Action)} IsEnabled={props.IsActionEnabled}/>,
          <Key key={1} Content='ABC' KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Alpha)} IsEnabled={props.IsAlphaEnabled}/>,
          <Key key={2} Content="123" KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Numeric)} IsEnabled={props.IsNumEnabled}/>
        ];
      case VirtualKeyboardPage.Action:
        return [
          <Key key={0} Content='ABC' KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Alpha)} IsEnabled={props.IsAlphaEnabled}/>,
          <Key key={1} Content="123" KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Numeric)} IsEnabled={props.IsNumEnabled}/>,
          <Key key={2} Content="!@#" KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Symbol)} IsEnabled={props.IsSymbolEnabled}/>
        ];
      case VirtualKeyboardPage.Alpha:
      default:
        return [
          <Key key={0} Content='CTRL' KeySize={keySize} WidthScale={actionKeyWidthScale} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Action)} IsEnabled={props.IsActionEnabled}/>,
          <Key key={1} Content="123" KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Numeric)} IsEnabled={props.IsNumEnabled}/>,
          <Key key={2} Content="!@#" KeySize={keySize} OnClick={() => props.OnPageChange(VirtualKeyboardPage.Symbol)} IsEnabled={props.IsSymbolEnabled}/>
        ];
    }
  };

  return (
    <div ref={ref} className="div__keyboard">
      <div className='div__keyboard-col-container'>
        {displayPage(props.CurrentPage)}
        <div className='div__keyboard-col'>
          <div className="div__keyboard-row">
            <Key Content="INS" KeySize={keySize} IsActive={props.IsInsertOn} OnClick={() => props.OnInsert(!props.IsInsertOn)} IsEnabled={props.IsInsertEnabled}/>
            <Key Content="HM" KeySize={keySize} OnClick={props.OnHome} IsEnabled={props.IsHomeEnabled}/>
            <Key Content="END" KeySize={keySize} OnClick={props.OnEnd} IsEnabled={props.IsEndEnabled}/>
          </div>
          <div className="div__keyboard-row">
            <Key Content="PU" KeySize={keySize} OnClick={props.OnPageUp} IsEnabled={props.IsPageUpEnabled}/>
            <Key Content={"\u{25B2}"} KeySize={keySize} OnClick={props.OnUp} IsEnabled={props.IsUpEnabled}/>
            <Key Content="PD" KeySize={keySize} OnClick={props.OnPageDown} IsEnabled={props.IsPageDownEnabled}/>
          </div>
          <div className="div__keyboard-row">
            <Key Content={"\u{25C4}"} KeySize={keySize} OnClick={props.OnLeft} IsEnabled={props.IsLeftEnabled}/>
            <Key Content={"\u{25BC}"} KeySize={keySize} OnClick={props.OnDown} IsEnabled={props.IsDownEnabled}/>
            <Key Content={"\u{25BA}"} KeySize={keySize} OnClick={props.OnRight} IsEnabled={props.IsRightEnabled}/>
          </div>
        </div>
      </div>
      <div className="div__keyboard-row">
        {pageButtons(props.CurrentPage)}
        <Key Content="SPACE" KeySize={keySize} WidthScale={spaceKeyWidthScale} AdditionalClass="div__space-key" OnClick={props.OnSpace} IsEnabled={props.IsSpaceEnabled}/>
        <Key Content="BACKSPACE" KeySize={keySize} WidthScale={backspaceKeyWidthScale} OnClick={props.OnBackspace} IsEnabled={props.IsBackspaceEnabled}/>
        <Key Content="DEL" KeySize={keySize} OnClick={props.OnDelete} IsEnabled={props.IsDeleteEnabled}/>
        <Key Content="ENTER" KeySize={keySize} WidthScale={enterKeyWidthScale} OnClick={props.OnEnter} IsEnabled={props.IsEnterEnabled}/>
      </div>
    </div>
  );
}