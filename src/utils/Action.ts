export class Action<T extends unknown[] = unknown[]> {
  private _actionSet = new Set<() => void>();

  public add(func: (...args: T) => void): void {
    this._actionSet.add(func);
  }
  
  public remove(func: (...args: T) => void): void {
    this._actionSet.delete(func);
  }

  public execute(...args: T): void {
    this._actionSet.forEach((action: (...args: T) => void) => action(...args));
  }
}