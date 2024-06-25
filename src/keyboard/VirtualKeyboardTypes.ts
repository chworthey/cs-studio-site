import { IClonable } from "../shared/IClonable";

export let GlobalInsertOn = false;

export function ToggleGlobalInsert() {
  GlobalInsertOn = !GlobalInsertOn;
}

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
  Caret,
  Ampersand,
  Asterix,
  LeftParenthesis,
  RightParenthesis,
  Dash,
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

export interface IKeyPress {
  Key: VirtualKeyboardKey;
  IsShiftDown: boolean;
  IsControlDown: boolean;
  IsCapsDown: boolean;
  IsInsertDown: boolean;
}

export const KeysByKeyCode = new Map<string, VirtualKeyboardKey>([
  ['Shift', VirtualKeyboardKey.Shift],
  ['CapsLock', VirtualKeyboardKey.Caps],
  ['Tab', VirtualKeyboardKey.Tab],
  [' ', VirtualKeyboardKey.Space],
  ['Spacebar', VirtualKeyboardKey.Space],
  ['Enter', VirtualKeyboardKey.Enter],
  ['ArrowUp', VirtualKeyboardKey.Up],
  ['ArrowLeft', VirtualKeyboardKey.Left],
  ['ArrowRight', VirtualKeyboardKey.Right],
  ['ArrowDown', VirtualKeyboardKey.Down],
  ['PageUp', VirtualKeyboardKey.PageUp],
  ['PageDown', VirtualKeyboardKey.PageDown],
  ['End', VirtualKeyboardKey.End],
  ['Delete', VirtualKeyboardKey.Delete],
  ['Insert', VirtualKeyboardKey.Insert],
  ['Home', VirtualKeyboardKey.Home],
  ['Backspace', VirtualKeyboardKey.Backspace],
  ['1', VirtualKeyboardKey.Num1],
  ['2', VirtualKeyboardKey.Num2],
  ['3', VirtualKeyboardKey.Num3],
  ['4', VirtualKeyboardKey.Num4],
  ['5', VirtualKeyboardKey.Num5],
  ['6', VirtualKeyboardKey.Num6],
  ['7', VirtualKeyboardKey.Num7],
  ['8', VirtualKeyboardKey.Num8],
  ['9', VirtualKeyboardKey.Num9],
  ['0', VirtualKeyboardKey.Num0],
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
  ['m', VirtualKeyboardKey.M],
  ['Q', VirtualKeyboardKey.Q],
  ['W', VirtualKeyboardKey.W],
  ['E', VirtualKeyboardKey.E],
  ['R', VirtualKeyboardKey.R],
  ['T', VirtualKeyboardKey.T],
  ['Y', VirtualKeyboardKey.Y],
  ['U', VirtualKeyboardKey.U],
  ['I', VirtualKeyboardKey.I],
  ['O', VirtualKeyboardKey.O],
  ['P', VirtualKeyboardKey.P],
  ['A', VirtualKeyboardKey.A],
  ['S', VirtualKeyboardKey.S],
  ['D', VirtualKeyboardKey.D],
  ['F', VirtualKeyboardKey.F],
  ['G', VirtualKeyboardKey.G],
  ['H', VirtualKeyboardKey.H],
  ['J', VirtualKeyboardKey.J],
  ['K', VirtualKeyboardKey.K],
  ['L', VirtualKeyboardKey.L],
  ['Z', VirtualKeyboardKey.Z],
  ['X', VirtualKeyboardKey.X],
  ['C', VirtualKeyboardKey.C],
  ['V', VirtualKeyboardKey.V],
  ['B', VirtualKeyboardKey.B],
  ['N', VirtualKeyboardKey.N],
  ['M', VirtualKeyboardKey.M],
  ['`', VirtualKeyboardKey.Backtick],
  ['~', VirtualKeyboardKey.Tilde],
  ['!', VirtualKeyboardKey.ExclamationPoint],
  ['@', VirtualKeyboardKey.AtSymbol],
  ['#', VirtualKeyboardKey.HashSign],
  ['$', VirtualKeyboardKey.DollarSign],
  ['%', VirtualKeyboardKey.Percent],
  ['^', VirtualKeyboardKey.Caret],
  ['&', VirtualKeyboardKey.Ampersand],
  ['*', VirtualKeyboardKey.Asterix],
  ['(', VirtualKeyboardKey.LeftParenthesis],
  [')', VirtualKeyboardKey.RightParenthesis],
  ['-', VirtualKeyboardKey.Dash],
  ['_', VirtualKeyboardKey.Underscore],
  ['=', VirtualKeyboardKey.Equals],
  ['+', VirtualKeyboardKey.Plus],
  ['[', VirtualKeyboardKey.LeftSquareBracket],
  [']', VirtualKeyboardKey.RightSquareBracket],
  ['{', VirtualKeyboardKey.LeftCurlyBrace],
  ['}', VirtualKeyboardKey.RightCurlyBrace],
  ['\\', VirtualKeyboardKey.BackSlash],
  ['|', VirtualKeyboardKey.PipeSymbol],
  [';', VirtualKeyboardKey.Semicolon],
  [':', VirtualKeyboardKey.Colon],
  ['\'', VirtualKeyboardKey.BackSlash],
  ['"', VirtualKeyboardKey.DoubleQuote],
  [',', VirtualKeyboardKey.Comma],
  ['.', VirtualKeyboardKey.Period],
  ['<', VirtualKeyboardKey.LessThan],
  ['>', VirtualKeyboardKey.GreaterThan],
  ['/', VirtualKeyboardKey.ForwardSlash],
  ['?', VirtualKeyboardKey.QuestionMark]
]);

export const KeysBySymbol = new Map<string, VirtualKeyboardKey>([
  ['`', VirtualKeyboardKey.Backtick],
  ['~', VirtualKeyboardKey.Tilde],
  ['!', VirtualKeyboardKey.ExclamationPoint],
  ['@', VirtualKeyboardKey.AtSymbol],
  ['#', VirtualKeyboardKey.HashSign],
  ['$', VirtualKeyboardKey.DollarSign],
  ['%', VirtualKeyboardKey.Percent],
  ['^', VirtualKeyboardKey.Caret],
  ['&', VirtualKeyboardKey.Ampersand],
  ['*', VirtualKeyboardKey.Asterix],
  ['(', VirtualKeyboardKey.LeftParenthesis],
  [')', VirtualKeyboardKey.RightParenthesis],
  ['-', VirtualKeyboardKey.Dash],
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

export const SymbolByKey = new Map<VirtualKeyboardKey, string>([
  [VirtualKeyboardKey.Backtick, '`'],
  [VirtualKeyboardKey.Tilde, '~'],
  [VirtualKeyboardKey.ExclamationPoint, '!'],
  [VirtualKeyboardKey.AtSymbol, '@'],
  [VirtualKeyboardKey.HashSign, '#'],
  [VirtualKeyboardKey.DollarSign, '$'],
  [VirtualKeyboardKey.Percent, '%'],
  [VirtualKeyboardKey.Caret, '^'],
  [VirtualKeyboardKey.Ampersand, '&'],
  [VirtualKeyboardKey.Asterix, '*'],
  [VirtualKeyboardKey.LeftParenthesis, '('],
  [VirtualKeyboardKey.RightParenthesis, ')'],
  [VirtualKeyboardKey.Dash, '-'],
  [VirtualKeyboardKey.Underscore, '_'],
  [VirtualKeyboardKey.Equals, '='],
  [VirtualKeyboardKey.Plus, '+'],
  [VirtualKeyboardKey.LeftSquareBracket, '['],
  [VirtualKeyboardKey.RightSquareBracket, ']'],
  [VirtualKeyboardKey.LeftCurlyBrace, '{'],
  [VirtualKeyboardKey.RightCurlyBrace, '}'],
  [VirtualKeyboardKey.Semicolon, ';'],
  [VirtualKeyboardKey.Colon, ':'],
  [VirtualKeyboardKey.SingleQuote, '\''],
  [VirtualKeyboardKey.DoubleQuote, '"'],
  [VirtualKeyboardKey.Comma, ','],
  [VirtualKeyboardKey.Period, '.'],
  [VirtualKeyboardKey.LessThan, '<'],
  [VirtualKeyboardKey.GreaterThan, '>'],
  [VirtualKeyboardKey.QuestionMark, '?'],
  [VirtualKeyboardKey.ForwardSlash, '/'],
  [VirtualKeyboardKey.BackSlash, '\\'],
  [VirtualKeyboardKey.PipeSymbol, '|']
]);

export const NumByKey = new Map<VirtualKeyboardKey, string>([
  [VirtualKeyboardKey.Num1, '1'],
  [VirtualKeyboardKey.Num2, '2'],
  [VirtualKeyboardKey.Num3, '3'],
  [VirtualKeyboardKey.Num4, '4'],
  [VirtualKeyboardKey.Num5, '5'],
  [VirtualKeyboardKey.Num6, '6'],
  [VirtualKeyboardKey.Num7, '7'],
  [VirtualKeyboardKey.Num8, '8'],
  [VirtualKeyboardKey.Num9, '9'],
  [VirtualKeyboardKey.Num0, '0']
]);

export const AlphaByKey = new Map<VirtualKeyboardKey, string>([
  [VirtualKeyboardKey.Q, 'q'],
  [VirtualKeyboardKey.W, 'w'],
  [VirtualKeyboardKey.E, 'e'],
  [VirtualKeyboardKey.R, 'r'],
  [VirtualKeyboardKey.T, 't'],
  [VirtualKeyboardKey.Y, 'y'],
  [VirtualKeyboardKey.U, 'u'],
  [VirtualKeyboardKey.I, 'i'],
  [VirtualKeyboardKey.O, 'o'],
  [VirtualKeyboardKey.P, 'p'],
  [VirtualKeyboardKey.A, 'a'],
  [VirtualKeyboardKey.S, 's'],
  [VirtualKeyboardKey.D, 'd'],
  [VirtualKeyboardKey.F, 'f'],
  [VirtualKeyboardKey.G, 'g'],
  [VirtualKeyboardKey.H, 'h'],
  [VirtualKeyboardKey.J, 'j'],
  [VirtualKeyboardKey.K, 'k'],
  [VirtualKeyboardKey.L, 'l'],
  [VirtualKeyboardKey.Z, 'z'],
  [VirtualKeyboardKey.X, 'x'],
  [VirtualKeyboardKey.C, 'c'],
  [VirtualKeyboardKey.V, 'v'],
  [VirtualKeyboardKey.B, 'b'],
  [VirtualKeyboardKey.N, 'n'],
  [VirtualKeyboardKey.M, 'm']
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
