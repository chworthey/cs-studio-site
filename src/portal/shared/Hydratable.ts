export interface IHydratable<T, I> {
  Id: string;
  Object: T | null;
  IsHydrated: boolean;
  Hydrate(input: I): boolean;
};

export class Hydratable<T, I> implements IHydratable<T, I> {
  Id: string;
  Object: T | null;
  IsHydrated: boolean;
  private getterFunc: (input: I, id: string) => (T | null);

  constructor(id: string, getterFunc: (input: I, id: string) => T) {
    this.Id = id;
    this.Object = null;
    this.IsHydrated = false;
    this.getterFunc = getterFunc;
  }

  Hydrate(input: I): boolean {
    let rv = false;
    const obj = this.getterFunc(input, this.Id);

    if (obj !== null) {
      this.IsHydrated = true;
      this.Object = obj;
      rv = true;
    }
    else {
      this.IsHydrated = false;
      this.Object = null;
    }

    return rv;
  }
};
