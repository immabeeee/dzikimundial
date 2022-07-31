import { ListQuery, Team } from '@dzikimundial-ws/api-interfaces'
import { RemoveTeam, RemoveTeamError } from '../../models/remove-team.model'

export interface TeamsStateEntity {
  selectedId?: string | number
  loaded: boolean
  error?: string | null

  teams: Team[] | null
  teamsLoading: boolean
  teamsError: string | null
  teamsListQuery: ListQuery | null

  team: Team | null
  teamLoading: boolean
  teamError: string | null

  updateTeamLoading: boolean
  updateTeamError: string | null

  createTeamLoading: boolean
  createTeamError: string | null
  lastCreatedTeam: Team | null

  removeTeamsLoading: RemoveTeam[]
  removeTeamsError: RemoveTeamError[]
}

export interface TeamListView {
  teams: Team[] | null
  isLoading: boolean
  error: string | null
  listQuery: ListQuery | null
}

export interface CreateTeamView {
  lastCreated: Team | null
  isLoading: boolean
  error: string | null
}

export interface RemoveTeamsView {
  removingTeams: RemoveTeam[]
  removingTeamsError: RemoveTeamError[]
}

export interface TeamView {
  team: Team | null
  isLoading: boolean
  error: string | null
}

export interface UpdateTeamView {
  isLoading: boolean
  error: string | null
}
