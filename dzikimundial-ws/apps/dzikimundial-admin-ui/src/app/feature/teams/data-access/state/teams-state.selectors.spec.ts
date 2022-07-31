import { initialState, State } from './teams-state.reducer'
import {
  getCreateTeamView,
  getRemoveTeamsView,
  getTeamListView,
  getTeamView,
  getUpdateTeamView,
} from './teams-state.selectors'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { generateDefaultListQuery, Team, TeamName } from '@dzikimundial-ws/api-interfaces'

describe('Selectors', () => {
  it('should select fetchTeamListView', () => {
    // given
    const state1: State = {
      ...initialState,
      teams: null,
      teamsLoading: false,
      teamsError: null,
      teamsListQuery: null,
    }

    const state2: State = {
      ...initialState,
      teams: [teamsTestData.findTeam(TeamName.ARGENTINA), teamsTestData.findTeam(TeamName.BELGIUM)] as Team[],
      teamsLoading: false,
      teamsError: null,
      teamsListQuery: generateDefaultListQuery(),
    }

    // when
    const result1 = getTeamListView.projector(state1)
    const result2 = getTeamListView.projector(state2)

    // then
    expect(result1).toEqual({
      teams: state1.teams,
      isLoading: state1.teamsLoading,
      error: state1.teamsError,
      listQuery: state1.teamsListQuery,
    })
    expect(result2).toEqual({
      teams: state2.teams,
      isLoading: state2.teamsLoading,
      error: state2.teamsError,
      listQuery: state2.teamsListQuery,
    })
  })

  it('should select createTeamView', () => {
    // given
    const state1: State = {
      ...initialState,
      createTeamLoading: false,
      createTeamError: null,
      lastCreatedTeam: null,
    }

    const state2: State = {
      ...initialState,
      createTeamLoading: false,
      createTeamError: null,
      lastCreatedTeam: teamsTestData.findTeam(TeamName.ARGENTINA) as Team,
    }

    // when
    const result1 = getCreateTeamView.projector(state1)
    const result2 = getCreateTeamView.projector(state2)

    // then
    expect(result1).toEqual({
      lastCreated: state1.lastCreatedTeam,
      isLoading: state1.createTeamLoading,
      error: state1.createTeamError,
    })
    expect(result2).toEqual({
      lastCreated: state2.lastCreatedTeam,
      isLoading: state2.createTeamLoading,
      error: state2.createTeamError,
    })
  })

  it('should select removeTeamsView', () => {
    // given
    const state1: State = {
      ...initialState,
      removeTeamsLoading: [],
      removeTeamsError: [],
    }

    const state2: State = {
      ...initialState,
      removeTeamsLoading: [{ id: '1' }],
      removeTeamsError: [{ id: '1', error: 'test error' }],
    }

    // when
    const result1 = getRemoveTeamsView.projector(state1)
    const result2 = getRemoveTeamsView.projector(state2)

    // then
    expect(result1).toEqual({
      removingTeams: state1.removeTeamsLoading,
      removingTeamsError: state1.removeTeamsError,
    })
    expect(result2).toEqual({
      removingTeams: state2.removeTeamsLoading,
      removingTeamsError: state2.removeTeamsError,
    })
  })

  it('should select teamView', () => {
    // given
    const state1: State = {
      ...initialState,
      team: null,
      teamLoading: false,
      teamError: null,
    }

    const state2: State = {
      ...initialState,
      team: teamsTestData.findTeam(TeamName.ARGENTINA) as Team,
      teamLoading: false,
      teamError: null,
    }

    // when
    const result1 = getTeamView.projector(state1)
    const result2 = getTeamView.projector(state2)

    // then
    expect(result1).toEqual({
      team: state1.team,
      error: state1.teamError,
      isLoading: state1.teamLoading,
    })
    expect(result2).toEqual({
      team: state2.team,
      error: state2.teamError,
      isLoading: state2.teamLoading,
    })
  })

  it('should select updateTeamView', () => {
    // given
    const state1: State = {
      ...initialState,
      updateTeamLoading: false,
      updateTeamError: null,
    }

    const state2: State = {
      ...initialState,
      updateTeamLoading: true,
      updateTeamError: null,
    }

    // when
    const result1 = getUpdateTeamView.projector(state1)
    const result2 = getUpdateTeamView.projector(state2)

    // then
    expect(result1).toEqual({
      error: state1.updateTeamError,
      isLoading: state1.updateTeamLoading,
    })
    expect(result2).toEqual({
      error: state2.updateTeamError,
      isLoading: state2.updateTeamLoading,
    })
  })
})
