import { useCallback, useEffect, useRef, useState } from 'react';
import './VirtualKeyboard.css'

interface IVirtualKeyboardProps {
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
]

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
  '*',
  '(',
  ')',
  '-',
  '_',
  '=',
  '+'
];

const symMid = [
  '[',
  ']',
  '{',
  '}',
  ';',
  ':',
  '\'',
  '"'
];

const symLow = [
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
]

const alphaLow = [
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm'
]

enum VirtualKeyboardContext {
  Alpha,
  Numeric,
  Symbol
}

interface IVirtualKeyboardState {
  ShiftOn: boolean;
  CapsOn: boolean;
  Context: VirtualKeyboardContext;
}

interface IKeyProps {
  Content: string;
  KeySize: number;
  WidthScale?: number;
  AdditionalClass?: string;
}

function Key(props: IKeyProps) {
  return (
    <div 
      className={props.AdditionalClass ? `div__key ${props.AdditionalClass}` : 'div__key'}
      style={{
      width: `${props.WidthScale ? Math.floor(props.KeySize * props.WidthScale) : props.KeySize}px`,
      height: `${props.KeySize}px`,
      fontSize: `${Math.floor(props.KeySize / 4)}px`}}>
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

  const [keyboardState, setKeyboardState] = useState<IVirtualKeyboardState>({
    ShiftOn: false,
    CapsOn: false,
    Context: VirtualKeyboardContext.Alpha
  });


  const ref = useRef<HTMLDivElement>(null);
  
  const dimensions = UseContainerDimensions(ref);
  const gapSize = 0.5;
  const tabKeyWidthScale = 1.33;
  const capsKeyWidthScale = 1.5;
  const shiftKeyWidthScale = 1.67;
  const enterKeyWidthScale = 2;
  const backspaceKeyWidthScale = 2.5;

  const across = tabKeyWidthScale + 13 + gapSize;

  const spaceKeyWidthScale = across - 3 - enterKeyWidthScale - backspaceKeyWidthScale;

  const keySize = Math.floor(dimensions.width / across) - 1;

  return (
    <div ref={ref} className="div__keyboard">
      <div className='div__keyboard-col-container'>
        <div className='div__keyboard-col'>
          <div className="div__keyboard-row">
            <Key Content="TAB" KeySize={keySize} WidthScale={tabKeyWidthScale}/>
            {alphaHigh.map(a => <Key key={a} Content={a} KeySize={keySize}/>)}
          </div>
          <div className="div__keyboard-row">
            <Key Content="CAPS" KeySize={keySize} WidthScale={capsKeyWidthScale}/>
            {alphaMid.map(a => <Key key={a} Content={a} KeySize={keySize}/>)}
          </div>
          <div className="div__keyboard-row">
            <Key Content="SHIFT" KeySize={keySize} WidthScale={shiftKeyWidthScale}/>
            {alphaLow.map(a => <Key key={a} Content={a} KeySize={keySize}/>)}
          </div>
        </div>
        <div className='div__keyboard-col'>
          <div className="div__keyboard-row">
            <Key Content="INS" KeySize={keySize}/>
            <Key Content="HM" KeySize={keySize}/>
            <Key Content="END" KeySize={keySize}/>
          </div>
          <div className="div__keyboard-row">
            <Key Content="PU" KeySize={keySize}/>
            <Key Content={"\u{25B2}"} KeySize={keySize}/>
            <Key Content="PD" KeySize={keySize}/>
          </div>
          <div className="div__keyboard-row">
            <Key Content={"\u{25C4}"} KeySize={keySize}/>
            <Key Content={"\u{25BC}"} KeySize={keySize}/>
            <Key Content={"\u{25BA}"} KeySize={keySize}/>
          </div>
        </div>
      </div>
      <div className="div__keyboard-row">
        <Key Content="123" KeySize={keySize}/>
        <Key Content="!@#" KeySize={keySize}/>
        <Key Content="SPACE" KeySize={keySize} WidthScale={spaceKeyWidthScale} AdditionalClass="div__space-key"/>
        <Key Content="BACKSPACE" KeySize={keySize} WidthScale={backspaceKeyWidthScale}/>
        <Key Content="DEL" KeySize={keySize}/>
        <Key Content="ENTER" KeySize={keySize} WidthScale={enterKeyWidthScale}/>
      </div>
    </div>
  );
}