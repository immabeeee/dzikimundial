import { CreateTeamRequest, CreateTeamResponse, GetTeamListResponse } from '@dzikimundial-ws/api-interfaces';
import { createAction, props } from '@ngrx/store'
import { TeamsStateEntity } from './teams-state.models';

export const init = createAction('[TeamsState Page] Init')

export const loadTeamsStateSuccess = createAction(
  '[TeamsState/API] Load TeamsState Success',
  props<{ teamsState: TeamsStateEntity[] }>(),
)

export const loadTeamsStateFailure = createAction('[TeamsState/API] Load TeamsState Failure', props<{ error: any }>())

export const fetchTeamList = createAction(
  '[Teams/API] Fetch Team List',
  props<{ pageNumber?: number, pageSize?: number }>()
);

export const fetchTeamListSuccess = createAction(
  '[Teams/API] Fetch Team List Success',
  props<{ resp: GetTeamListResponse }>()
);

export const fetchTeamListFailure = createAction(
  '[Teams/API] Fetch Team List Failure',
  props<{ error: string }>()
);

export const createTeam = createAction(
  '[Teams/API] Create Team',
  props<{ req: CreateTeamRequest }>()
);

export const createTeamSuccess = createAction(
  '[Teams/API] Create Team Success',
  props<{ resp: CreateTeamResponse }>()
);

export const createTeamFailure = createAction(
  '[Teams/API] Create Team Failure',
  props<{ error: string }>()
);