import { IClonable } from "../shared/IClonable";

export type KeyMask = AllowedKeyMask | DisallowedKeyMask;
export type ActionMask = AllowedActionMask | DisallowedActionMask;

export interface IVirtualKeyboardConfig extends IClonable<IVirtualKeyboardConfig> {
  IsActionEnabled: boolean;
  IsAlphaEnabled: boolean;
  IsNumEnabled: boolean;
  IsSymbolsEnabled: boolean;
  KeyMask?: KeyMask;
  ActionMask?: ActionMask;
  DefaultPage: VirtualKeyboardPage;
};

export interface IVirtualKeyboard extends IClonable<IVirtualKeyboard> {
  IsShiftOn: boolean;
  IsCapsOn: boolean;
  IsInsertOn: boolean;
  CurrentPage: VirtualKeyboardPage;
  Config: IVirtualKeyboardConfig;
  OnShift(on: boolean): void;
  OnCaps(on: boolean): void;
  OnInsert(on: boolean): void;
  OnPageChange(page: VirtualKeyboardPage): void;
  OnNum(char: string): void;
  OnAlpha(char: string): void;
  OnSymbol(char: string): void;
  OnKey(key: VirtualKeyboardKey): void;
  OnAction(action: VirtualKeyboardAction): void;
};

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
};

export enum VirtualKeyboardKey {
  Q,
  W,
  E,
  R,
  T,
  Y,
  U,
  I,
  O,
  P,
  A,
  S,
  D,
  F,
  G,
  H,
  J,
  K,
  L,
  Z,
  X,
  C,
  V,
  B,
  N,
  M,
  Shift,
  Caps,
  Tab,
  Space,
  Enter,
  Up,
  Left,
  Down,
  Right,
  Insert,
  Home,
  End,
  PageUp,
  PageDown,
  Backspace,
  Delete,
  Num1,
  Num2,
  Num3,
  Num4,
  Num5,
  Num6,
  Num7,
  Num8,
  Num9,
  Num0,
  Backtick,
  Tilde,
  ExclamationPoint,
  AtSymbol,
  HashSign,
  DollarSign,
  Percent,
  Carret,
  Ampersand,
  Asterix,
  LeftParenthesis,
  RightParenthesis,
  Minus,
  Underscore,
  Equals,
  Plus,
  LeftSquareBracket,
  RightSquareBracket,
  LeftCurlyBrace,
  RightCurlyBrace,
  Semicolon,
  Colon,
  SingleQuote,
  DoubleQuote,
  Comma,
  Period,
  LessThan,
  GreaterThan,
  QuestionMark,
  ForwardSlash,
  BackSlash,
  PipeSymbol
};


export const KeysBySymbol = new Map<string, VirtualKeyboardKey>([
  ['`', VirtualKeyboardKey.Backtick],
  ['~', VirtualKeyboardKey.Tilde],
  ['!', VirtualKeyboardKey.ExclamationPoint],
  ['@', VirtualKeyboardKey.AtSymbol],
  ['$', VirtualKeyboardKey.HashSign],
  ['$', VirtualKeyboardKey.DollarSign],
  ['%', VirtualKeyboardKey.Percent],
  ['^', VirtualKeyboardKey.Carret],
  ['&', VirtualKeyboardKey.Ampersand],
  ['*', VirtualKeyboardKey.Asterix],
  ['(', VirtualKeyboardKey.LeftParenthesis],
  [')', VirtualKeyboardKey.RightParenthesis],
  ['-', VirtualKeyboardKey.Minus],
  ['_', VirtualKeyboardKey.Underscore],
  ['=', VirtualKeyboardKey.Equals],
  ['+', VirtualKeyboardKey.Plus],
  ['[', VirtualKeyboardKey.LeftSquareBracket],
  [']', VirtualKeyboardKey.RightSquareBracket],
  ['{', VirtualKeyboardKey.LeftCurlyBrace],
  ['}', VirtualKeyboardKey.RightCurlyBrace],
  [';', VirtualKeyboardKey.Semicolon],
  [':', VirtualKeyboardKey.Colon],
  ['\'', VirtualKeyboardKey.SingleQuote],
  ['"', VirtualKeyboardKey.DoubleQuote],
  [',', VirtualKeyboardKey.Comma],
  ['.', VirtualKeyboardKey.Period],
  ['<', VirtualKeyboardKey.LessThan],
  ['>', VirtualKeyboardKey.GreaterThan],
  ['?', VirtualKeyboardKey.QuestionMark],
  ['/', VirtualKeyboardKey.ForwardSlash],
  ['\\', VirtualKeyboardKey.BackSlash],
  ['|', VirtualKeyboardKey.PipeSymbol]
]);

export const KeysByNum = new Map<string, VirtualKeyboardKey>([
  ['1', VirtualKeyboardKey.Num1],
  ['2', VirtualKeyboardKey.Num2],
  ['3', VirtualKeyboardKey.Num3],
  ['4', VirtualKeyboardKey.Num4],
  ['5', VirtualKeyboardKey.Num5],
  ['6', VirtualKeyboardKey.Num6],
  ['7', VirtualKeyboardKey.Num7],
  ['8', VirtualKeyboardKey.Num8],
  ['9', VirtualKeyboardKey.Num9],
  ['0', VirtualKeyboardKey.Num0]
]);

export const KeysByAlpha = new Map<string, VirtualKeyboardKey>([
  ['q', VirtualKeyboardKey.Q],
  ['w', VirtualKeyboardKey.W],
  ['e', VirtualKeyboardKey.E],
  ['r', VirtualKeyboardKey.R],
  ['t', VirtualKeyboardKey.T],
  ['y', VirtualKeyboardKey.Y],
  ['u', VirtualKeyboardKey.U],
  ['i', VirtualKeyboardKey.I],
  ['o', VirtualKeyboardKey.O],
  ['p', VirtualKeyboardKey.P],
  ['a', VirtualKeyboardKey.A],
  ['s', VirtualKeyboardKey.S],
  ['d', VirtualKeyboardKey.D],
  ['f', VirtualKeyboardKey.F],
  ['g', VirtualKeyboardKey.G],
  ['h', VirtualKeyboardKey.H],
  ['j', VirtualKeyboardKey.J],
  ['k', VirtualKeyboardKey.K],
  ['l', VirtualKeyboardKey.L],
  ['z', VirtualKeyboardKey.Z],
  ['x', VirtualKeyboardKey.X],
  ['c', VirtualKeyboardKey.C],
  ['v', VirtualKeyboardKey.V],
  ['b', VirtualKeyboardKey.B],
  ['n', VirtualKeyboardKey.N],
  ['m', VirtualKeyboardKey.M]
]);

export interface AllowedKeyMask {
  MaskModeType: MaskModeType.Allowed;
  Keys: VirtualKeyboardKey[];
}

export interface DisallowedKeyMask {
  MaskModeType: MaskModeType.Disallowed;
  Keys: VirtualKeyboardKey[];
}

export interface AllowedActionMask {
  MaskModeType: MaskModeType.Allowed;
  Actions: VirtualKeyboardAction[];
}

export interface DisallowedActionMask {
  MaskModeType: MaskModeType.Disallowed;
  Actions: VirtualKeyboardAction[];
}

export enum MaskModeType {
  Allowed,
  Disallowed
};
