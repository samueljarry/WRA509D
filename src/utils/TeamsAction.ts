import { Action } from "./Action";

export class TeamsAction {
  private static _TeamsActionSet = new Action();
  private static _TeamMembersActionsSet = new Action();

  public static Add(func: () => void): void {
    this._TeamMembersActionsSet.add(func);
  }

  public static AddOnTeamsChange(func: () => void): void {
    this._TeamsActionSet.add(func);
  }

  public static Remove(func: () => void): void {
    this._TeamMembersActionsSet.remove(func);
  }

  public static RemoveOnTeamsChange(func: () => void): void {
    this._TeamsActionSet.remove(func);
  }

  public static Dispatch(): void {
    this._TeamMembersActionsSet.execute();
  }

  public static DispatchOnTeamsChange(): void {
    this._TeamsActionSet.execute();
  }
}