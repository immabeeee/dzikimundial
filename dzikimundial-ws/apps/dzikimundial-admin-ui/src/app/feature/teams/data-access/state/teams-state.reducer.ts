import { Team } from '@dzikimundial-ws/api-interfaces'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { createReducer, on, Action } from '@ngrx/store'

import * as TeamsStateActions from './teams-state.actions'
import { TeamsStateEntity } from './teams-state.models'

export const TEAMS_STATE_FEATURE_KEY = 'teamsState'

export interface State extends EntityState<TeamsStateEntity> {
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

export interface TeamsStatePartialState {
  readonly [TEAMS_STATE_FEATURE_KEY]: State
}

export const teamsStateAdapter: EntityAdapter<TeamsStateEntity> = createEntityAdapter<TeamsStateEntity>()

export const initialState: State = teamsStateAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  teams: null,
  teamsLoading:false,
  teamsError: null, 
  pageNumber: 0,
  pageSize: 100,
  createTeamLoading: false,
  createTeamError: null,
  lastCreatedTeam: null,
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
  })),
  on(TeamsStateActions.fetchTeamListSuccess, (state, action) => ({
    ...state,
    teams: action.resp.teams,
    teamsLoading: false,
    teamsError: null, 
    pageNumber: action.resp.pageNumber,
    pageSize: action.resp.pageSize
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
)

export function reducer(state: State | undefined, action: Action) {
  return teamsStateReducer(state, action)
}
