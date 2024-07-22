import { IClonable } from "./IClonable";

export function MutateClone<T extends IClonable<T>>(object: T, mutateFunction: (newObject: T) => void) {
  const newObject = object.Clone();
  mutateFunction(newObject);
  return newObject;
};
