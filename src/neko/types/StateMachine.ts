export interface IStateMachineTransition
  <StateID extends number, CommandID extends number>
{
  State: StateID;
  Command: CommandID;
};

export interface IStateMachineTransitionTableRow
  <StateID extends number, CommandID extends number>
{
  Transition: IStateMachineTransition<StateID, CommandID>;
  NextState: StateID;
};

export class StateMachine
  <StateID extends number, CommandID extends number>
{
  private _currentState: StateID;
  private _transitionTable: IStateMachineTransitionTableRow<StateID, CommandID>[];
  private _newStateFunctions: Map<StateID, (() => void)[]>;

  get CurrentState() {
    return this._currentState;
  }

  GetNext(command: CommandID) {
    const nextState = this._transitionTable.find(
      r =>
        r.Transition.State === this._currentState &&
        r.Transition.Command === command);
    return nextState?.NextState;
  }

  MoveNext(command: CommandID) {
    const nextState = this.GetNext(command);
    if (nextState !== undefined) {
      this._currentState = nextState;
      const fns = this._newStateFunctions.get(nextState);
      if (fns) {
        fns.forEach(f => f());
      }
    }
    return this._currentState;
  }

  RegisterOnNewStateFunction(state: StateID, func: () => void) {
    const arr = this._newStateFunctions.get(state);
    if (arr) {
      arr.push(func);
    }
    else {
      this._newStateFunctions.set(state, [func]);
    }
  }

  constructor(
    transitionTable: IStateMachineTransitionTableRow<StateID, CommandID>[],
    initialState: StateID)
  {
    this._transitionTable = transitionTable;
    this._currentState = initialState;
    this._newStateFunctions = new Map<StateID, (() => void)[]>();
  }
};
