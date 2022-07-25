import { ListQuery, Team } from '@dzikimundial-ws/api-interfaces'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { createReducer, on, Action } from '@ngrx/store'
import { RemoveTeam, RemoveTeamError } from '../../models/remove-team.model'

import * as TeamsStateActions from './teams-state.actions'
import { TeamsStateEntity } from './teams-state.models'

export const TEAMS_STATE_FEATURE_KEY = 'teamsState'

export interface State extends EntityState<TeamsStateEntity> {
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

export interface TeamsStatePartialState {
  readonly [TEAMS_STATE_FEATURE_KEY]: State
}

export const teamsStateAdapter: EntityAdapter<TeamsStateEntity> = createEntityAdapter<TeamsStateEntity>()

export const initialState: State = teamsStateAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  teams: null,
  teamsLoading: false,
  teamsError: null,
  teamsListQuery: null,
  team: null,
  teamLoading: false,
  teamError: null,
  updateTeamLoading: false,
  updateTeamError: null,
  createTeamLoading: false,
  createTeamError: null,
  lastCreatedTeam: null,
  removeTeamsLoading: [],
  removeTeamsError: [],
})

const teamsStateReducer = createReducer(
  initialState,
  on(TeamsStateActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(TeamsStateActions.loadTeamsStateSuccess, (state, { teamsState }) =>
    teamsStateAdapter.setAll(teamsState, { ...state, loaded: true }),
  ),
  on(TeamsStateActions.loadTeamsStateFailure, (state, { error }) => ({ ...state, error })),
  on(TeamsStateActions.fetchTeamList, (state, action) => ({
    ...state,
    teams: null,
    teamsLoading: true,
    teamsError: null,
    teamsListQuery: action.listQuery ? action.listQuery : state.teamsListQuery,
  })),
  on(TeamsStateActions.fetchTeamListSuccess, (state, action) => ({
    ...state,
    teams: action.resp.teams,
    teamsLoading: false,
    teamsError: null,
    teamsListQuery: state.teamsListQuery
      ? state.teamsListQuery?.updatePage(action.resp.pageNumber, action.resp.pageSize)
      : state.teamsListQuery,
  })),
  on(TeamsStateActions.fetchTeamListFailure, (state, action) => ({
    ...state,
    teams: null,
    teamsLoading: false,
    teamsError: action.error,
  })),
  on(TeamsStateActions.createTeam, (state, action) => ({
    ...state,
    createTeamLoading: true,
    createTeamError: null,
    lastCreatedTeam: null,
  })),
  on(TeamsStateActions.createTeamSuccess, (state, action) => ({
    ...state,
    createTeamLoading: false,
    createTeamError: null,
    lastCreatedTeam: action.resp,
  })),
  on(TeamsStateActions.createTeamFailure, (state, action) => ({
    ...state,
    createTeamLoading: false,
    createTeamError: action.error,
  })),
  on(TeamsStateActions.removeTeam, (state, action) => ({
    ...state,
    removeTeamsLoading: [...state.removeTeamsLoading, { id: action.id }],
    removeTeamsError: findRemovingTeamError(state.removeTeamsError, action.id)
      ? filterRemovingTeamError(state.removeTeamsError, action.id)
      : state.removeTeamsError,
  })),
  on(TeamsStateActions.removeTeamSuccess, (state, action) => ({
    ...state,
    removeTeamsLoading: filterTeamsLoading(state.removeTeamsLoading, action.id)
      ? filterTeamsLoading(state.removeTeamsLoading, action.id)
      : state.removeTeamsLoading,
  })),
  on(TeamsStateActions.removeTeamFailure, (state, action) => ({
    ...state,
    removeTeamsLoading: findTeamLoading(state.removeTeamsLoading, action.id)
      ? filterTeamsLoading(state.removeTeamsLoading, action.id)
      : state.removeTeamsLoading,
    removeTeamsError: filterRemovingTeamError(state.removeTeamsError, action.id)
      ? state.removeTeamsError
      : [...state.removeTeamsError, { id: action.id, error: action.error }],
  })),
  on(TeamsStateActions.fetchTeam, (state, action) => ({
    ...state,
    team: null,
    teamLoading: true,
    teamError: null,
  })),
  on(TeamsStateActions.fetchTeamSuccess, (state, action) => ({
    ...state,
    team: action.team,
    teamLoading: false,
    teamError: null,
  })),
  on(TeamsStateActions.fetchTeamFailure, (state, action) => ({
    ...state,
    team: null,
    teamLoading: false,
    teamError: action.error,
  })),
  on(TeamsStateActions.updateTeam, (state, action) => ({
    ...state,
    updateTeamLoading: true,
    updateTeamError: null,
  })),
  on(TeamsStateActions.updateTeamSuccess, (state, action) => ({
    ...state,
    team: action.resp,
    updateTeamLoading: false,
    updateTeamError: null,
  })),
  on(TeamsStateActions.updateTeamFailure, (state, action) => ({
    ...state,
    updateTeamLoading: false,
    updateTeamError: action.error,
  })),
)

export function reducer(state: State | undefined, action: Action) {
  return teamsStateReducer(state, action)
}

function findRemovingTeamError(teams: RemoveTeamError[], id: string): RemoveTeam | undefined {
  return teams.find((team) => team.id === id)
}

function filterRemovingTeamError(teams: RemoveTeamError[], id: string): RemoveTeamError[] {
  return teams.filter((team) => team.id !== id)
}

function findTeamLoading(teams: RemoveTeam[], id: string): RemoveTeam | undefined {
  return teams.find((e) => e.id === id)
}

function filterTeamsLoading(teams: RemoveTeam[], id: string): RemoveTeam[] {
  return teams.filter((team) => team.id !== id)
}
