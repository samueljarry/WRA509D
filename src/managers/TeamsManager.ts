import AsyncStorage from "@react-native-async-storage/async-storage";
import { Action } from '../utils/Action';

export type Team = Array<Character>;

export class TeamsManager {
  public static OnTeamsUpdate = new Action();
  public static OnAddTeammate = new Action();

  private static readonly STORAGE_ID = 'teams-store';
  private static _TeamsSet = new Array<Team>();
  private static _NewTeam = new Array<Character>();
  

  private static async _UpdateTeams(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_ID, JSON.stringify(this._TeamsSet));
      this.OnTeamsUpdate.execute();
    } catch (error) {
      console.error(error);
    }
  }

  public static LoadTeams = async (): Promise<void> => {
    // await AsyncStorage.setItem(this.STORAGE_ID, JSON.stringify(null));
    const teams = await AsyncStorage.getItem(this.STORAGE_ID) as string;

    console.log(JSON.parse(teams), 'parse')
    if(!JSON.parse(teams)) {
      this._TeamsSet = new Array<Team>();
    } else {
      this._TeamsSet = JSON.parse(teams);
    }
  }

  public static CreateTeam(): void {
    this._NewTeam = new Array<Character>();
  }

  public static SetCharacter(emplacementId: number, character: Character): void {
    this._NewTeam[emplacementId] = character;
    this.OnAddTeammate.execute();
  }

  public static GetCharacter(emplacementId: number): Character | undefined {
    return this._NewTeam[emplacementId];
  }

  public static SaveNewTeam = async (): Promise<void> => {
    this._TeamsSet.push(this._NewTeam);
    await this._UpdateTeams();
    this._ClearPreviousTeam();
    this.OnTeamsUpdate.execute();
  }

  private static _ClearPreviousTeam(): void {
    this._NewTeam = new Array<Character>();
  }

  public static get Teams(): Array<Team> { return this._TeamsSet; }
}