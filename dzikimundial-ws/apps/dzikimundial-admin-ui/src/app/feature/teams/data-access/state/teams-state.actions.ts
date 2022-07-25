import {
  CreateTeamRequest,
  CreateTeamResponse,
  GetTeamListResponse,
  ListQuery,
  Team,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from '@dzikimundial-ws/api-interfaces'
import { createAction, props } from '@ngrx/store'
import { TeamsStateEntity } from './teams-state.models'

export const init = createAction('[TeamsState Page] Init')

export const loadTeamsStateSuccess = createAction(
  '[TeamsState/API] Load TeamsState Success',
  props<{ teamsState: TeamsStateEntity[] }>(),
)

export const loadTeamsStateFailure = createAction('[TeamsState/API] Load TeamsState Failure', props<{ error: any }>())

export const fetchTeamList = createAction('[Teams/API] Fetch Team List', props<{ listQuery?: ListQuery }>())

export const fetchTeamListSuccess = createAction(
  '[Teams/API] Fetch Team List Success',
  props<{ resp: GetTeamListResponse }>(),
)

export const fetchTeamListFailure = createAction('[Teams/API] Fetch Team List Failure', props<{ error: string }>())

export const createTeam = createAction('[Teams/API] Create Team', props<{ req: CreateTeamRequest }>())

export const createTeamSuccess = createAction('[Teams/API] Create Team Success', props<{ resp: CreateTeamResponse }>())

export const createTeamFailure = createAction('[Teams/API] Create Team Failure', props<{ error: string }>())

export const updateTeam = createAction('[Teams/API] Update Team', props<{ id: string; req: UpdateTeamRequest }>())

export const updateTeamSuccess = createAction('[Teams/API] Update Team Success', props<{ resp: UpdateTeamResponse }>())

export const updateTeamFailure = createAction('[Teams/API] Update Team Failure', props<{ error: string }>())

export const removeTeam = createAction('[Teams/API] Remove Team', props<{ id: string }>())

export const removeTeamSuccess = createAction('[Teams/API] Remove Team Success', props<{ id: string }>())

export const removeTeamFailure = createAction('[Teams/API] Remove Team Failure', props<{ id: string; error: string }>())

export const fetchTeam = createAction('[Teams/API] Fetch Team', props<{ id: string }>())

export const fetchTeamSuccess = createAction('[Teams/API] Fetch Team Success', props<{ team: Team }>())

export const fetchTeamFailure = createAction('[Teams/API] Fetch Team Failure', props<{ error: string }>())
