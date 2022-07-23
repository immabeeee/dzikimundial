import { Team } from "@dzikimundial-ws/api-interfaces"

export interface TeamsStateEntity {
  selectedId?: string | number 
  loaded: boolean 
  error?: string | null

  teams: Team[] | null;
  teamsLoading: boolean;
  teamsError: string | null; 
  pageNumber: number;
  pageSize: number;

  createTeamLoading: boolean;
  createTeamError: string | null;
  lastCreatedTeam: Team | null
}

export interface TeamListView{
  teams: Team[] | null;
  isLoading: boolean;
  error: string | null; 
  pageNumber: number;
  pageSize: number;
}

export interface CreateTeamView{
  lastCreated: Team | null;
  isLoading: boolean;
  error: string | null; 
}