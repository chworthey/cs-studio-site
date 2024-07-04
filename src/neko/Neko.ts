import { AddVec2, CreateVec2, DistanceVec2, DotVec2, IVec2, ScaleVec2, SubtractVec2 } from "./VecMath";

enum NekoDirection {
  Up,
  Right,
  Down,
  Left
}

enum NekoMode {
  Walking,
  Searching,
  Playing,
  Sitting,
  Sleeping,
  WakeUp
}

const nekoSearchDuration = 1000;
const nekoSpeed = 0.2;
const nekoPlayDistance = 50;
const nekoAnimationFrameDuration = 250;

interface ITimedNekoAnimation {
  StartTime: DOMHighResTimeStamp;
  Duration: number;
}

interface ITimeParameters {
  Now: DOMHighResTimeStamp;
  DeltaTime: number;
  TotalElapsed: number;
}

enum BehaviorTreeStatus {
  Failure,
  Success,
  Running
}

interface IBehaviorTreeNode {
  Update(time: ITimeParameters): BehaviorTreeStatus;
  Nodes: IBehaviorTreeNode[];
  Reset(): void;
}

class BehaviorTreeSelectorNode implements IBehaviorTreeNode {
  Update(time: ITimeParameters): BehaviorTreeStatus {
    for (let node of this.Nodes) {
      const status = node.Update(time);
      if (status === BehaviorTreeStatus.Running) {
        return BehaviorTreeStatus.Running;
      }
      else if (status === BehaviorTreeStatus.Success) {
        return BehaviorTreeStatus.Success;
      }
    }
    return BehaviorTreeStatus.Failure;
  }
  Nodes: IBehaviorTreeNode[];
  constructor(nodes: IBehaviorTreeNode[]) {
    this.Nodes = nodes;
  }
  Reset(): void {
    throw new Error("Method not implemented.");
  }
}

class BehaviorTreeSequenceNode implements IBehaviorTreeNode {
  Update(time: ITimeParameters): BehaviorTreeStatus {
    for (let node of this.Nodes) {
      const status = node.Update(time);
      if (status === BehaviorTreeStatus.Running) {
        return BehaviorTreeStatus.Running;
      }
      else if (status === BehaviorTreeStatus.Failure) {
        return BehaviorTreeStatus.Failure;
      }
    }
    return BehaviorTreeStatus.Success;
  }
  Nodes: IBehaviorTreeNode[];
  constructor(nodes: IBehaviorTreeNode[]) {
    this.Nodes = nodes;
  }
  Reset(): void {
    for (let node of this.Nodes) {
      node.Reset();
    }
  }
}

abstract class BehaviorTreeDecoratorNodeBase implements IBehaviorTreeNode {
  Update(time: ITimeParameters): BehaviorTreeStatus {
    return this.Nodes.length > 0 ? 
      this.Nodes[0].Update(time) : 
      BehaviorTreeStatus.Failure;
    
  }
  Nodes: IBehaviorTreeNode[];
  constructor(childNode: IBehaviorTreeNode) {
    this.Nodes = [childNode];
  }
  Reset(): void {
    if (this.Nodes.length > 0) {
      this.Nodes[0].Reset();
    }
  }
}

class BehaviorTreeRepeatDecoratorNode extends BehaviorTreeDecoratorNodeBase {
  Update(time: ITimeParameters): BehaviorTreeStatus {
    if (this.Nodes.length > 0) {
      const node = this.Nodes[0];
      const status = node.Update(time);
      if (status !== BehaviorTreeStatus.Running) {
        node.Reset();
      }
    }

    return BehaviorTreeStatus.Running;
  }
}

class BehaviorTreeTimeoutDecoratorNode extends BehaviorTreeDecoratorNodeBase {
  Duration: number;
  ProgressTime: number;
  Update(time: ITimeParameters): BehaviorTreeStatus {
    this.ProgressTime += time.DeltaTime;

    if (this.ProgressTime > this.Duration) {
      return BehaviorTreeStatus.Failure;
    }
    else if (this.Nodes.length > 0) {
      const node = this.Nodes[0];
      const status = node.Update(time);
      return status;
    }

    return BehaviorTreeStatus.Failure;
  }
  constructor(childNode: IBehaviorTreeNode, timeout: number) {
    super(childNode);
    this.Duration = timeout;
    this.ProgressTime = 0;
  }
  Reset(): void {
    this.ProgressTime = 0;
    if (this.Nodes.length > 0) {
      this.Nodes[0].Reset();
    }
  }
}


class BehaviorTreeInvertDecoratorNode extends BehaviorTreeDecoratorNodeBase {
  Update(time: ITimeParameters): BehaviorTreeStatus {
    let rv = BehaviorTreeStatus.Failure;

    if (this.Nodes.length > 0) {
      const node = this.Nodes[0];
      const status = node.Update(time);
      switch (status) {
        case BehaviorTreeStatus.Running:
          rv = BehaviorTreeStatus.Running;
          break;
        case BehaviorTreeStatus.Failure:
          rv = BehaviorTreeStatus.Success;
          break;
        case BehaviorTreeStatus.Success:
          rv = BehaviorTreeStatus.Failure;
          break;
        default:
          break;
      }
    }

    return rv;
  }
}


abstract class BehaviorTreeExecutorNodeBase implements IBehaviorTreeNode {
  Update(_time: ITimeParameters): BehaviorTreeStatus {
    return BehaviorTreeStatus.Success;
  }
  Nodes: IBehaviorTreeNode[];
  constructor() {
    this.Nodes = [];
  }
  Reset(): void {
  }
}

class BehaviorTreeDelayExecutorNode extends BehaviorTreeExecutorNodeBase {
  Duration: number;
  ProgressTime: number;
  constructor(duration: number) {
    super();
    this.Duration = duration;
    this.ProgressTime = 0;
  }
  Update(time: ITimeParameters): BehaviorTreeStatus {
    this.ProgressTime += time.DeltaTime;
    return this.ProgressTime > this.Duration ? 
      BehaviorTreeStatus.Success : BehaviorTreeStatus.Running;
  }
  Reset(): void {
    this.ProgressTime = 0;
  }
}

interface INekoBlackBoard {
  SpriteName: string;
  Position: IVec2;
  Target: IVec2;
  Direction: NekoDirection;
}

class BehaviorTreeBlackBoardNode<T> extends BehaviorTreeExecutorNodeBase {
  BlackBoard: T;
  BlackBoardFunction: (blackboard: T, time: ITimeParameters) => BehaviorTreeStatus;
  // IsCompleted: boolean;
  // LastStatus: BehaviorTreeStatus;

  constructor(blackBoard: T, blackBoardFunction: (blackboard: T, time: ITimeParameters) => BehaviorTreeStatus) {
    super();
    this.BlackBoard = blackBoard;
    this.BlackBoardFunction = blackBoardFunction;
    // this.IsCompleted = false;
    // this.LastStatus = BehaviorTreeStatus.Failure;
  }

  Update(time: ITimeParameters): BehaviorTreeStatus {
    // let rv = this.LastStatus;
    // if (!this.IsCompleted) {
    const rv = this.BlackBoardFunction(this.BlackBoard, time);
    //   this.LastStatus = rv;
    //   if (rv !== BehaviorTreeStatus.Running) {
    //     this.IsCompleted = true;
    //   }
    // }
    return rv;
  }
  Reset(): void {
    // this.IsCompleted = false;
    // this.LastStatus = BehaviorTreeStatus.Failure;
  }
}

export class Neko {
  Position: IVec2;
  Mode: NekoMode;
  Direction: NekoDirection;
  TargetPosition: IVec2;
  SpriteName: string;
  BlackBoard: INekoBlackBoard;
  BehaviorTree: IBehaviorTreeNode;

  constructor() {
    this.Position = CreateVec2();
    this.Mode = NekoMode.Searching;
    this.Direction = NekoDirection.Up;
    this.TargetPosition = CreateVec2();
    this.SpriteName = 'wash1';
    const bb: INekoBlackBoard = {
      SpriteName: this.SpriteName,
      Position: this.Position,
      Target: this.TargetPosition,
      Direction: this.Direction
    };
    this.BlackBoard = bb;

    const animationNode = (spriteBaseName: string, alternates: boolean, usesDirection: boolean) => {
      const getDirStr = (direction: NekoDirection) => {
        let dirStr = '';
        switch (direction) {
          case NekoDirection.Up:
            dirStr = 'up';
            break;
          case NekoDirection.Right:
            dirStr = 'right';
            break;
          case NekoDirection.Down:
            dirStr = 'down';
            break;
          case NekoDirection.Left:
            dirStr = 'left';
            break
          default:
            break;
        }
        return dirStr;
      }

      if (alternates) {
        return new BehaviorTreeInvertDecoratorNode(
          new BehaviorTreeTimeoutDecoratorNode(
            new BehaviorTreeRepeatDecoratorNode(
              new BehaviorTreeSequenceNode([
                new BehaviorTreeBlackBoardNode(
                  bb,
                  bb => {
                    const dirStr =  usesDirection ? getDirStr(bb.Direction) : '';
                    bb.SpriteName = `${dirStr}${spriteBaseName}1`
                    return BehaviorTreeStatus.Success;
                  }
                ),
                new BehaviorTreeDelayExecutorNode(nekoAnimationFrameDuration),
                new BehaviorTreeBlackBoardNode(
                  bb,
                  bb => {
                    const dirStr =  usesDirection ? getDirStr(bb.Direction) : '';
                    bb.SpriteName = `${dirStr}${spriteBaseName}2`
                    return BehaviorTreeStatus.Success;
                  }
                ),
                new BehaviorTreeDelayExecutorNode(nekoAnimationFrameDuration),
              ])
            ), nekoSearchDuration
          )
        );
      }
      else {
        return new BehaviorTreeBlackBoardNode(
          bb,
          bb => {
            const dirStr =  usesDirection ? getDirStr(bb.Direction) : '';
            bb.SpriteName = `${dirStr}${spriteBaseName}`;
            return BehaviorTreeStatus.Success;
          }
        )
      }
    };

    this.BehaviorTree = new BehaviorTreeRepeatDecoratorNode(
      new BehaviorTreeSequenceNode([
        new BehaviorTreeBlackBoardNode(
          bb,
          bb => !this.isCloseToTarget(bb.Position, bb.Target, nekoPlayDistance) ? 
            BehaviorTreeStatus.Success :
            BehaviorTreeStatus.Failure
        ),
        animationNode('wash', true, false),
        new BehaviorTreeBlackBoardNode(
          bb,
          bb => {
            const isTargetBehind = this.isTargetBehind(bb.Position, bb.Target, bb.Direction);
            if (isTargetBehind) {
              bb.Direction = this.chooseDirection(bb.Position, bb.Target);
            }
            return !isTargetBehind ?
              BehaviorTreeStatus.Success :
              BehaviorTreeStatus.Failure
          }
        ),
        animationNode('', true, true), // walk
        new BehaviorTreeBlackBoardNode(
          bb,
          (bb, time) => {
            const newPos = this.moveForward(bb.Position, bb.Direction, nekoSpeed, time.DeltaTime);
            bb.Position = newPos;
            return BehaviorTreeStatus.Running;
          }
        )
      ])
    );
  }

  Update(time: ITimeParameters) {
    this.BlackBoard.Target = this.TargetPosition;
    this.BehaviorTree.Update(time);
    this.Position = this.BlackBoard.Position;
    this.Direction = this.BlackBoard.Direction;
    this.SpriteName = this.BlackBoard.SpriteName;
  }

  private getVelocity(direction: NekoDirection, speed: number, delta: number) {
    const dirVec = this.getDirVec(direction);
    return ScaleVec2(dirVec, speed * delta);
  }

  private moveForward(position: IVec2, direction: NekoDirection, speed: number, delta: number) {
    const vel = this.getVelocity(direction, speed, delta);
    return AddVec2(position, vel)
  }

  private isCloseToTarget(vec1: IVec2, vec2: IVec2, threshold: number) {
    return DistanceVec2(vec1, vec2) <= threshold;
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

  private isTargetBehind(position: IVec2, target: IVec2, direction: NekoDirection) {
    const dTarget = SubtractVec2(target, position);
    const dirVec = this.getDirVec(direction);

    return DotVec2(dirVec, dTarget) < 0;
  }

  private chooseDirection(position: IVec2, target: IVec2) {
    let rv;
    const x = position.X;
    const y = position.Y;
  
    if (Math.abs(target.X - x) > Math.abs(target.Y- y)) {
      if (x > target.X) {
        rv = NekoDirection.Left;
      }
      else {
        rv = NekoDirection.Right;
      }
    }
    else {
      if (y > target.Y) {
        rv = NekoDirection.Up;
      }
      else {
        rv = NekoDirection.Down;
      }
    }
  
    return rv;
  }
};


