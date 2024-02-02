import AsyncStorage from "@react-native-async-storage/async-storage";
import { TeamsAction } from "../utils/TeamsAction";

export type Team = Map<number, Character>;

export class TeamsManager {
  private static readonly STORAGE_ID = 'teams-store';
  private static _TeamsSet = new Set<Team>();
  private static _NewTeam = new Map<number, Character>();

  private static async _UpdateTeams(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_ID, JSON.stringify(this._TeamsSet));
      TeamsAction.DispatchOnTeamsChange();
    } catch (error) {
      console.error(error);
    }
  }

  public static async LoadTeams(): Promise<void> {
    const teams = await AsyncStorage.getItem(this.STORAGE_ID);
    this._TeamsSet = teams 
      ? JSON.parse(teams) 
      : new Set<Map<number, Character>>();

      console.log(this._TeamsSet)
  }

  public static CreateTeam(): void {
    this._NewTeam = new Map<number, Character>();
  }

  public static SetCharacter(emplacementId: number, character: Character): void {
    this._NewTeam.set(emplacementId, character);
    TeamsAction.Dispatch();
  }

  public static GetCharacter(emplacementId: number): Character | undefined {
    return this._NewTeam.get(emplacementId);
  }

  public static async SaveNewTeam(): Promise<void> {
    this._TeamsSet.add(this._NewTeam);
    await this._UpdateTeams();
    this._ClearPreviousTeam();
    TeamsAction.Dispatch();
  }

  private static _ClearPreviousTeam(): void {
    this._NewTeam.clear();
  }

  public static get Teams(): Set<Team> { return this._TeamsSet; }
}