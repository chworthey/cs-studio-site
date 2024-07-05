import { FrameAnimationTimer } from "./FrameAnimationTimer";
import { ITimeParameters } from "./ITimeParameters";
import { IStateMachineTransitionTableRow, StateMachine } from "./StateMachine";
import { AddVec2, CloneVec2, CreateVec2, DistanceVec2, DotVec2, IVec2, ScaleVec2, SubtractVec2 } from "./VecMath";

export enum NekoSprite {
  Wash1,
  Wash2,
  Up1,
  Up2,
  Right1,
  Right2,
  Down1,
  Down2,
  Left1,
  Left2,
  Awake,
  Sleep1,
  Sleep2,
  UpClaw1,
  UpClaw2,
  RightClaw1,
  RightClaw2,
  DownClaw1,
  DownClaw2,
  LeftClaw1,
  LeftClaw2,
  Scratch1,
  Scratch2
};

const nekoFrames: NekoSprite[] = [
  NekoSprite.Wash1,
  NekoSprite.Wash2,
  NekoSprite.Up1,
  NekoSprite.Up2,
  NekoSprite.Right1,
  NekoSprite.Right2,
  NekoSprite.Down1,
  NekoSprite.Down2,
  NekoSprite.Left1,
  NekoSprite.Left2,
  NekoSprite.Awake,
  NekoSprite.Sleep1,
  NekoSprite.Sleep2,
  NekoSprite.UpClaw1,
  NekoSprite.UpClaw2,
  NekoSprite.RightClaw1,
  NekoSprite.RightClaw2,
  NekoSprite.DownClaw1,
  NekoSprite.DownClaw2,
  NekoSprite.LeftClaw1,
  NekoSprite.LeftClaw2,
  NekoSprite.Scratch1,
  NekoSprite.Scratch2
];

interface INekoAnimationParameters {
  FrameCount: number;
  Duration: number;
  RepeatCount: number;
  FrameOffset: number;
}

const animationWash: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 0
};

const animationUp: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 2
};

const animationRight: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 4
};

const animationDown: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 6
};

const animationLeft: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 8
};

const animationAwake: INekoAnimationParameters = {
  FrameCount: 1,
  Duration: 1500,
  RepeatCount: 1,
  FrameOffset: 10
};

const animationSleep: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 1,
  FrameOffset: 11
};

const animationUpClaw: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 13
};

const animationRightClaw: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 15
};

const animationDownClaw: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 17
};

const animationLeftClaw: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 19
};

const animationScratch: INekoAnimationParameters = {
  FrameCount: 2,
  Duration: 1500,
  RepeatCount: 4,
  FrameOffset: 21
};

enum NekoDirection {
  Up,
  Right,
  Down,
  Left
}

const nekoSpeed = 0.2;
const nekoNearDistanceThreshold = 50;
const nekoFarDistanceThreshold = 150;

enum NekoDistanceThreshold {
  Near,
  Far
}

enum NekoState {
  WakingUp,
  GoingToSleep,
  Sleeping,
  Walking,
  Playing,
  Searching
}

enum NekoCommand {
  Search,
  Walk,
  Play,
  GetTired,
  Sleep,
  WakeUp
}

const nekoTransitionTable: IStateMachineTransitionTableRow<NekoState, NekoCommand>[] = [
  {
    Transition: {
      State: NekoState.Searching,
      Command: NekoCommand.Walk
    },
    NextState: NekoState.Walking
  },
  {
    Transition: {
      State: NekoState.Searching,
      Command: NekoCommand.Play
    },
    NextState: NekoState.Playing
  },
  {
    Transition: {
      State: NekoState.Walking,
      Command: NekoCommand.Search
    },
    NextState: NekoState.Searching
  },
  {
    Transition: {
      State: NekoState.Walking,
      Command: NekoCommand.Play
    },
    NextState: NekoState.Playing
  },
  {
    Transition: {
      State: NekoState.Playing,
      Command: NekoCommand.Search
    },
    NextState: NekoState.Searching
  },
  {
    Transition: {
      State: NekoState.Playing,
      Command: NekoCommand.GetTired
    },
    NextState: NekoState.GoingToSleep
  },
  {
    Transition: {
      State: NekoState.GoingToSleep,
      Command: NekoCommand.Sleep
    },
    NextState: NekoState.Sleeping
  },
  {
    Transition: {
      State: NekoState.GoingToSleep,
      Command: NekoCommand.Search
    },
    NextState: NekoState.Searching
  },
  {
    Transition: {
      State: NekoState.Sleeping,
      Command: NekoCommand.WakeUp
    },
    NextState: NekoState.WakingUp
  },
  {
    Transition: {
      State: NekoState.WakingUp,
      Command: NekoCommand.Search
    },
    NextState: NekoState.Searching
  }
];

export class Neko {
  private _position: IVec2;
  private _direction: NekoDirection;
  private _targetPosition: Readonly<IVec2>;
  private _sprite: NekoSprite;
  private _stateMachine: StateMachine<NekoState, NekoCommand>;
  private _animationTimer: FrameAnimationTimer;

  set TargetPosition(position: IVec2) {
    this._targetPosition = CloneVec2(position);
  }
  get TargetPosition() {
    return CloneVec2(this._targetPosition);
  }
  get Position() {
    return CloneVec2(this._position);
  }
  get Sprite() {
    return this._sprite;
  }

  constructor() {
    const startPosition = CreateVec2();
    startPosition.X = 700;
    startPosition.Y = 200;
    this._position = startPosition;
    this._direction = NekoDirection.Up;
    this._targetPosition = CreateVec2();
    this._sprite = NekoSprite.Wash1;
    this._animationTimer = new FrameAnimationTimer(
      animationWash.Duration,
      animationWash.RepeatCount,
      animationWash.FrameCount,
      animationWash.FrameOffset);

    const machine = new StateMachine(nekoTransitionTable, NekoState.Searching);

    const setAnimation = (animationParameters: INekoAnimationParameters) => {
      const timer = this._animationTimer;
      timer.Reset();
      timer.Duration = animationParameters.Duration;
      timer.FrameCount = animationParameters.FrameCount;
      timer.FrameOffset = animationParameters.FrameOffset;
      timer.RepeatCount = animationParameters.RepeatCount;
    };

    machine.RegisterOnNewStateFunction(NekoState.Searching, () => {
      setAnimation(animationWash);
    });

    machine.RegisterOnNewStateFunction(NekoState.Walking, () => {
      switch (this._direction) {
        case NekoDirection.Up:
          setAnimation(animationUp);
          break;
        case NekoDirection.Right:
          setAnimation(animationRight);
          break;
        case NekoDirection.Down:
          setAnimation(animationDown);
          break;
        case NekoDirection.Left:
        default:
          setAnimation(animationLeft);
          break;
      }
    });

    machine.RegisterOnNewStateFunction(NekoState.Playing, () => {
      switch (this._direction) {
        case NekoDirection.Up:
          setAnimation(animationUpClaw);
          break;
        case NekoDirection.Right:
          setAnimation(animationRightClaw);
          break;
        case NekoDirection.Down:
          setAnimation(animationDownClaw);
          break;
        case NekoDirection.Left:
        default:
          setAnimation(animationLeftClaw);
          break;
      }
    });

    machine.RegisterOnNewStateFunction(NekoState.GoingToSleep, () => {
      setAnimation(animationScratch);
    });

    machine.RegisterOnNewStateFunction(NekoState.Sleeping, () => {
      setAnimation(animationSleep);
    });

    machine.RegisterOnNewStateFunction(NekoState.WakingUp, () => {
      setAnimation(animationAwake);
    });

    this._stateMachine = machine;
  }

  Update(time: ITimeParameters) {
    const machine = this._stateMachine;
    const state = machine.CurrentState;
    const timer = this._animationTimer;

    timer.Update(time);

    switch(state) {
      case NekoState.Searching:
        if (this.isCloseToTarget(NekoDistanceThreshold.Near)) {
          machine.MoveNext(NekoCommand.Play);
        }
        else if (timer.IsComplete) {
          this.chooseDirection();
          machine.MoveNext(NekoCommand.Walk);
        }
        break;
      case NekoState.Playing:
        if (!this.isCloseToTarget(NekoDistanceThreshold.Near)) {
          machine.MoveNext(NekoCommand.Search);
        }
        else if (timer.IsComplete) {
          machine.MoveNext(NekoCommand.GetTired);
        }
        break;
      case NekoState.GoingToSleep:
        if (!this.isCloseToTarget(NekoDistanceThreshold.Near)) {
          machine.MoveNext(NekoCommand.Search);
        }
        else if (timer.IsComplete) {
          machine.MoveNext(NekoCommand.Sleep);
        }
        break;
      case NekoState.Sleeping:
        if (!this.isCloseToTarget(NekoDistanceThreshold.Far)) {
          machine.MoveNext(NekoCommand.WakeUp);
        }
        else if (timer.IsComplete) {
          timer.Reset();
        }
        break;
      case NekoState.WakingUp:
        if (timer.IsComplete) {
          machine.MoveNext(NekoCommand.Search);
        }
        break;
      case NekoState.Walking:
        if (this.isCloseToTarget(NekoDistanceThreshold.Near)) {
          machine.MoveNext(NekoCommand.Play);
        }
        else if (this.isTargetBehind()) {
          machine.MoveNext(NekoCommand.Search);
        }
        else {
          if (timer.IsComplete) {
            timer.Reset();
          }
          this.moveForward(time.DeltaTime);
        }
        break;
      default:
        break;
    }

    this._sprite = nekoFrames[timer.CurrentFrame];
  }

  private getVelocity(deltaTime: number) {
    return ScaleVec2(this.getDirVec(this._direction), nekoSpeed * deltaTime);
  }

  private moveForward(deltaTime: number) {
    const velocity = this.getVelocity(deltaTime);
    this._position = AddVec2(this._position, velocity);
  }

  private isCloseToTarget(threshold: NekoDistanceThreshold) {
    const thresholdValue = threshold === NekoDistanceThreshold.Near ? 
      nekoNearDistanceThreshold :
      nekoFarDistanceThreshold;
    return DistanceVec2(this._position, this._targetPosition) <= thresholdValue;
  }

  private getDirVec(direction: NekoDirection) {
    const rv = CreateVec2();

    switch(direction)
    {
      case NekoDirection.Up:
        rv.X = 0;
        rv.Y = -1;
        break;
      case NekoDirection.Right:
        rv.X = 1;
        rv.Y = 0;
        break;
      case NekoDirection.Down:
        rv.X = 0;
        rv.Y = 1;
        break;
      case NekoDirection.Left:
        rv.X = -1;
        rv.Y = 0;
        break;
      default:
        rv.X = 0;
        rv.Y = 0;
        break;
    }

    return rv;
  }

  private isTargetBehind() {
    const dTarget = SubtractVec2(this.TargetPosition, this.Position);
    const dirVec = this.getDirVec(this._direction);

    return DotVec2(dirVec, dTarget) < 0;
  }

  private chooseDirection() {
    let dir;
    const position = this._position;
    const target = this._targetPosition;
    const x = position.X;
    const y = position.Y;
  
    if (Math.abs(target.X - x) > Math.abs(target.Y- y)) {
      if (x > target.X) {
        dir = NekoDirection.Left;
      }
      else {
        dir = NekoDirection.Right;
      }
    }
    else {
      if (y > target.Y) {
        dir = NekoDirection.Up;
      }
      else {
        dir = NekoDirection.Down;
      }
    }

    this._direction = dir;
  }
};


