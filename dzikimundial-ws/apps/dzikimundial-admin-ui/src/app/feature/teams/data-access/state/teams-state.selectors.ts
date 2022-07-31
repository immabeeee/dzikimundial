import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  CreateTeamView,
  RemoveTeamsView,
  TeamListView,
  TeamsStateEntity,
  TeamView,
  UpdateTeamView,
} from './teams-state.models'
import { TEAMS_STATE_FEATURE_KEY, State, teamsStateAdapter } from './teams-state.reducer'

// Lookup the 'TeamsState' feature state managed by NgRx
export const getTeamsStateState = createFeatureSelector<State>(TEAMS_STATE_FEATURE_KEY)

const { selectAll, selectEntities } = teamsStateAdapter.getSelectors()

export const getTeamsStateLoaded = createSelector(getTeamsStateState, (state: State) => state.loaded)

export const getTeamsStateError = createSelector(getTeamsStateState, (state: State) => state.error)

export const getAllTeamsState = createSelector(getTeamsStateState, (state: State) => selectAll(state))

export const getTeamsStateEntities = createSelector(getTeamsStateState, (state: State) => selectEntities(state))

export const getSelectedId = createSelector(getTeamsStateState, (state: State) => state.selectedId)

export const getSelected = createSelector(getTeamsStateEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
)

export const getTeamListView = createSelector<TeamsStateEntity, State, TeamListView>(
  getTeamsStateState,
  (state: State) => {
    return {
      teams: state.teams,
      isLoading: state.teamsLoading,
      error: state.teamsError,
      listQuery: state.teamsListQuery,
    }
  },
)

export const getCreateTeamView = createSelector<TeamsStateEntity, State, CreateTeamView>(
  getTeamsStateState,
  (state: State) => {
    return {
      lastCreated: state.lastCreatedTeam,
      isLoading: state.createTeamLoading,
      error: state.createTeamError,
    }
  },
)

export const getRemoveTeamsView = createSelector<TeamsStateEntity, State, RemoveTeamsView>(
  getTeamsStateState,
  (state: State) => {
    return {
      removingTeams: state.removeTeamsLoading,
      removingTeamsError: state.removeTeamsError,
    }
  },
)

export const getTeamView = createSelector<TeamsStateEntity, State, TeamView>(getTeamsStateState, (state: State) => {
  return {
    team: state.team,
    error: state.teamError,
    isLoading: state.teamLoading,
  }
})

export const getUpdateTeamView = createSelector<TeamsStateEntity, State, UpdateTeamView>(
  getTeamsStateState,
  (state: State) => {
    return {
      error: state.updateTeamError,
      isLoading: state.updateTeamLoading,
    }
  },
)
