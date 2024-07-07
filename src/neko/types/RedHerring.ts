import { ITimeParameters } from "./ITimeParameters";
import { AddVec2, CloneVec2, CreateVec2, IVec2, LengthVec2, ScaleVec2, SubtractVec2 } from "./VecMath";

export class RedHerring {
  _position: IVec2;
  _mouseInside: boolean;
  _mouseDown: boolean;
  _width: number;
  _height: number;
  _grabbed: boolean;
  _mousePosition: Readonly<IVec2>;
  _lastMousePosition: Readonly<IVec2>;
  _lastMouseVelocity: Readonly<IVec2>;
  _lastMouseAcceleration: Readonly<IVec2>;

  _acceleration: IVec2;
  _velocity: IVec2;

  set MousePosition(position: IVec2) {
    this._mousePosition = CloneVec2(position);
  }

  set MouseDown(down: boolean) {
    this._mouseDown = down;
  }

  set MouseInside(inside: boolean) {
    this._mouseInside = inside;
  }

  get Position() {
    return CloneVec2(this._position);
  }

  set Width(width: number) {
    this._width = width;
    this._position.X = Math.min(width, this._position.X);
  }

  set Height(height: number) {
    this._height = height;
    this._position.Y = Math.min(height, this._position.Y);
  }

  constructor(width: number, height: number) {
    this._mouseInside = false;
    this._height = height;
    this._width = width;
    const initialPosition = CreateVec2();
    initialPosition.X = 100;
    initialPosition.Y = 100;
    this._position  = initialPosition;
    this._acceleration = CreateVec2();
    this._velocity = CreateVec2();
    this._mouseDown = false;
    this._grabbed = false;
    this._mousePosition = CreateVec2();
    this._lastMousePosition = CreateVec2();
    this._lastMouseVelocity = CreateVec2();
    this._lastMouseAcceleration = CreateVec2();
  }

  Update(time: ITimeParameters) {
    if (!this._grabbed) {
      if (this._mouseDown && this._mouseInside) {
        this._grabbed = true;
      }
      else {
        const velocity = ScaleVec2(this._velocity, time.DeltaTime);
        const mass = 0.5;
        const momentum = ScaleVec2(velocity, mass);
        this._position = AddVec2(this._position, velocity);
        const speed = LengthVec2(velocity);
        const drag = 0.03 * Math.pow(speed, 2);
        console.log(drag);
        const dragAccel = ScaleVec2(ScaleVec2(velocity, -1), drag);
        this._velocity = AddVec2(this._velocity, ScaleVec2(dragAccel, time.DeltaTime));
        // this._acceleration = AddVec2(this._acceleration, dragAccel);
        const coefficientOfRestitution = 0.8;
      }
    }
    else {
      const mouseDelta = SubtractVec2(this._mousePosition, this._lastMousePosition);
      const mouseVelocity = ScaleVec2(mouseDelta, 1.0 / time.DeltaTime);
      const mouseVelocityDelta = SubtractVec2(mouseVelocity, this._lastMouseVelocity);
      const mouseAcceleration = ScaleVec2(mouseVelocityDelta, 1.0 / time.DeltaTime);

      this._position = CloneVec2(this._mousePosition);

      this._lastMouseAcceleration = CloneVec2(mouseAcceleration);
      this._lastMouseVelocity = CloneVec2(mouseVelocity);

      if (!this._mouseDown) {
        this._grabbed = false;
        this._acceleration = mouseAcceleration;
        this._velocity = mouseVelocity;
      }
    }

    this._lastMousePosition = CloneVec2(this._mousePosition);
  }
};