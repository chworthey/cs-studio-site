import { IClonable } from "../../shared/IClonable";
import { KeyboardKey } from "../../shared/KeyboardKey";

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
  OnKey(key: KeyboardKey): void;
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

export const KeysBySymbol = new Map<string, KeyboardKey>([
  ['`', KeyboardKey.Backtick],
  ['~', KeyboardKey.Tilde],
  ['!', KeyboardKey.ExclamationPoint],
  ['@', KeyboardKey.AtSymbol],
  ['#', KeyboardKey.HashSign],
  ['$', KeyboardKey.DollarSign],
  ['%', KeyboardKey.Percent],
  ['^', KeyboardKey.Caret],
  ['&', KeyboardKey.Ampersand],
  ['*', KeyboardKey.Asterix],
  ['(', KeyboardKey.LeftParenthesis],
  [')', KeyboardKey.RightParenthesis],
  ['-', KeyboardKey.Dash],
  ['_', KeyboardKey.Underscore],
  ['=', KeyboardKey.Equals],
  ['+', KeyboardKey.Plus],
  ['[', KeyboardKey.LeftSquareBracket],
  [']', KeyboardKey.RightSquareBracket],
  ['{', KeyboardKey.LeftCurlyBrace],
  ['}', KeyboardKey.RightCurlyBrace],
  [';', KeyboardKey.Semicolon],
  [':', KeyboardKey.Colon],
  ['\'', KeyboardKey.SingleQuote],
  ['"', KeyboardKey.DoubleQuote],
  [',', KeyboardKey.Comma],
  ['.', KeyboardKey.Period],
  ['<', KeyboardKey.LessThan],
  ['>', KeyboardKey.GreaterThan],
  ['?', KeyboardKey.QuestionMark],
  ['/', KeyboardKey.ForwardSlash],
  ['\\', KeyboardKey.BackSlash],
  ['|', KeyboardKey.PipeSymbol]
]);

export const KeysByNum = new Map<string, KeyboardKey>([
  ['1', KeyboardKey.Num1],
  ['2', KeyboardKey.Num2],
  ['3', KeyboardKey.Num3],
  ['4', KeyboardKey.Num4],
  ['5', KeyboardKey.Num5],
  ['6', KeyboardKey.Num6],
  ['7', KeyboardKey.Num7],
  ['8', KeyboardKey.Num8],
  ['9', KeyboardKey.Num9],
  ['0', KeyboardKey.Num0]
]);

export const KeysByAlpha = new Map<string, KeyboardKey>([
  ['q', KeyboardKey.Q],
  ['w', KeyboardKey.W],
  ['e', KeyboardKey.E],
  ['r', KeyboardKey.R],
  ['t', KeyboardKey.T],
  ['y', KeyboardKey.Y],
  ['u', KeyboardKey.U],
  ['i', KeyboardKey.I],
  ['o', KeyboardKey.O],
  ['p', KeyboardKey.P],
  ['a', KeyboardKey.A],
  ['s', KeyboardKey.S],
  ['d', KeyboardKey.D],
  ['f', KeyboardKey.F],
  ['g', KeyboardKey.G],
  ['h', KeyboardKey.H],
  ['j', KeyboardKey.J],
  ['k', KeyboardKey.K],
  ['l', KeyboardKey.L],
  ['z', KeyboardKey.Z],
  ['x', KeyboardKey.X],
  ['c', KeyboardKey.C],
  ['v', KeyboardKey.V],
  ['b', KeyboardKey.B],
  ['n', KeyboardKey.N],
  ['m', KeyboardKey.M]
]);

export const SymbolByKey = new Map<KeyboardKey, string>([
  [KeyboardKey.Backtick, '`'],
  [KeyboardKey.Tilde, '~'],
  [KeyboardKey.ExclamationPoint, '!'],
  [KeyboardKey.AtSymbol, '@'],
  [KeyboardKey.HashSign, '#'],
  [KeyboardKey.DollarSign, '$'],
  [KeyboardKey.Percent, '%'],
  [KeyboardKey.Caret, '^'],
  [KeyboardKey.Ampersand, '&'],
  [KeyboardKey.Asterix, '*'],
  [KeyboardKey.LeftParenthesis, '('],
  [KeyboardKey.RightParenthesis, ')'],
  [KeyboardKey.Dash, '-'],
  [KeyboardKey.Underscore, '_'],
  [KeyboardKey.Equals, '='],
  [KeyboardKey.Plus, '+'],
  [KeyboardKey.LeftSquareBracket, '['],
  [KeyboardKey.RightSquareBracket, ']'],
  [KeyboardKey.LeftCurlyBrace, '{'],
  [KeyboardKey.RightCurlyBrace, '}'],
  [KeyboardKey.Semicolon, ';'],
  [KeyboardKey.Colon, ':'],
  [KeyboardKey.SingleQuote, '\''],
  [KeyboardKey.DoubleQuote, '"'],
  [KeyboardKey.Comma, ','],
  [KeyboardKey.Period, '.'],
  [KeyboardKey.LessThan, '<'],
  [KeyboardKey.GreaterThan, '>'],
  [KeyboardKey.QuestionMark, '?'],
  [KeyboardKey.ForwardSlash, '/'],
  [KeyboardKey.BackSlash, '\\'],
  [KeyboardKey.PipeSymbol, '|']
]);

export const NumByKey = new Map<KeyboardKey, string>([
  [KeyboardKey.Num1, '1'],
  [KeyboardKey.Num2, '2'],
  [KeyboardKey.Num3, '3'],
  [KeyboardKey.Num4, '4'],
  [KeyboardKey.Num5, '5'],
  [KeyboardKey.Num6, '6'],
  [KeyboardKey.Num7, '7'],
  [KeyboardKey.Num8, '8'],
  [KeyboardKey.Num9, '9'],
  [KeyboardKey.Num0, '0']
]);

export const AlphaByKey = new Map<KeyboardKey, string>([
  [KeyboardKey.Q, 'q'],
  [KeyboardKey.W, 'w'],
  [KeyboardKey.E, 'e'],
  [KeyboardKey.R, 'r'],
  [KeyboardKey.T, 't'],
  [KeyboardKey.Y, 'y'],
  [KeyboardKey.U, 'u'],
  [KeyboardKey.I, 'i'],
  [KeyboardKey.O, 'o'],
  [KeyboardKey.P, 'p'],
  [KeyboardKey.A, 'a'],
  [KeyboardKey.S, 's'],
  [KeyboardKey.D, 'd'],
  [KeyboardKey.F, 'f'],
  [KeyboardKey.G, 'g'],
  [KeyboardKey.H, 'h'],
  [KeyboardKey.J, 'j'],
  [KeyboardKey.K, 'k'],
  [KeyboardKey.L, 'l'],
  [KeyboardKey.Z, 'z'],
  [KeyboardKey.X, 'x'],
  [KeyboardKey.C, 'c'],
  [KeyboardKey.V, 'v'],
  [KeyboardKey.B, 'b'],
  [KeyboardKey.N, 'n'],
  [KeyboardKey.M, 'm']
]);

export interface AllowedKeyMask {
  MaskModeType: MaskModeType.Allowed;
  Keys: KeyboardKey[];
}

export interface DisallowedKeyMask {
  MaskModeType: MaskModeType.Disallowed;
  Keys: KeyboardKey[];
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
