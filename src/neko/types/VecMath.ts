export interface IVec2 {
  X: number;
  Y: number;
};

export function CreateVec2() {
  const rv: IVec2 = { X: 0, Y: 0 };
  return rv;
};

export function AddVec2(vec1: IVec2, vec2: IVec2) {
  const rv = CreateVec2();
  rv.X = vec1.X + vec2.X;
  rv.Y = vec1.Y + vec2.Y;
  return rv;
};

export function SubtractVec2(vec1: IVec2, vec2: IVec2) {
  const rv = CreateVec2();
  rv.X = vec1.X - vec2.X;
  rv.Y = vec1.Y - vec2.Y;
  return rv;
};

export function ScaleVec2(vec: IVec2, scalar: number) {
  const rv = CreateVec2();
  rv.X = vec.X * scalar;
  rv.Y = vec.Y * scalar;
  return rv;
}

export function DotVec2(vec1: IVec2, vec2: IVec2) {
  return vec1.X * vec2.X + vec1.Y * vec2.Y;
};

export function DistanceVec2(vec1: IVec2, vec2: IVec2) {
  return Math.sqrt(Math.pow(vec2.X - vec1.X, 2) + Math.pow(vec2.Y - vec1.Y, 2));
};

export function CloneVec2(vec: IVec2) {
  const rv: IVec2 = { X: vec.X, Y: vec.Y };
  return rv;
};
