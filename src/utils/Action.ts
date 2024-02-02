export class Action {
  private _actionSet = new Set<() => void>();

  public set(func: () => void): void {
    this._actionSet.add(func);
  }
  
  public remove(func: () => void): void {
    this._actionSet.delete(func);
  }

  public execute(): void {
    this._actionSet.forEach((action: () => void) => action());
  }
}