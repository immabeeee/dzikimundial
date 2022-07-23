import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CreateTeamView, TeamListView, TeamsStateEntity } from './teams-state.models'
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
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
    }
  }
)

export const getCreateTeamView = createSelector<TeamsStateEntity, State, CreateTeamView>(
  getTeamsStateState,
  (state: State) => {
    return {
      lastCreated: state.lastCreatedTeam,
      isLoading: state.createTeamLoading,
      error: state.createTeamError
    }
  }
)
