import { ITimeParameters } from "./ITimeParameters";

export class FrameAnimationTimer {
  private _progressTime: DOMHighResTimeStamp;
  private _duration: number;
  private _repeatCount: number;
  private _currentFrame: number;
  private _frameCount: number;
  private _frameOffset: number;

  get IsComplete() {
    return this._progressTime >= this._duration;
  }

  get CurrentFrame() {
    return this._currentFrame;
  }

  get Duration() {
    return this._duration;
  }

  set Duration(duration: number) {
    this._duration = duration;
  }

  get RepeatCount() {
    return this._repeatCount;
  }

  set RepeatCount(repeatCount: number) {
    this._repeatCount = repeatCount;
  }

  get FrameCount() {
    return this._frameCount;
  }

  set FrameCount(frameCount: number) {
    this._frameCount = frameCount;
  }

  get FrameOffset() {
    return this._frameOffset;
  }

  set FrameOffset(frameOffset: number) {
    this._frameOffset = frameOffset;
  }

  Reset() {
    this._progressTime = 0;
  }

  Update(time: ITimeParameters) {
    if (!this.IsComplete) {
      this._progressTime = Math.min(this._duration, this._progressTime + time.DeltaTime);
      this._currentFrame =
        Math.floor(this._progressTime / this._duration * this._repeatCount * this._frameCount) % 
        this._frameCount +
        this._frameOffset;
    }
  }

  constructor(
    duration: number,
    repeatCount: number,
    frameCount: number,
    frameOffset: number)
  {
    this._progressTime = 0;
    this._currentFrame = 0;
    this._duration = duration;
    this._repeatCount = repeatCount;
    this._frameCount = frameCount;
    this._frameOffset = frameOffset;
  }
};
