import {
  CreateTeamRequest,
  CreateTeamResponse,
  generateDefaultListQuery,
  GetTeamListResponse,
  TeamName,
  UpdateTeamRequest,
} from '@dzikimundial-ws/api-interfaces'
import * as reducer from './teams-state.reducer'
import {
  createTeam,
  createTeamFailure,
  createTeamSuccess,
  fetchTeam,
  fetchTeamFailure,
  fetchTeamList,
  fetchTeamListFailure,
  fetchTeamListSuccess,
  fetchTeamSuccess,
  removeTeam,
  removeTeamFailure,
  removeTeamSuccess,
  updateTeam,
  updateTeamFailure,
  updateTeamSuccess,
} from './teams-state.actions'
import * as teamsTestData from '@dzikimundial-ws/test-utils'

describe('TeamsReducer', () => {
  describe('FetchTeamList', () => {
    describe('fetchTeamList action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialState
        const existingState2 = {
          ...reducer.initialState,
          teamsListQuery: generateDefaultListQuery().updatePage(0, 100),
        }

        // when
        const action1 = fetchTeamList({ listQuery: generateDefaultListQuery().updatePage(1, 100) })
        const state1 = reducer.reducer(existingState1, action1)

        const action2 = fetchTeamList({ listQuery: undefined })
        const state2 = reducer.reducer(existingState2, action2)

        // then

        expect(state1).toEqual({
          ...existingState1,
          teams: null,
          teamsLoading: true,
          teamsError: null,
          teamsListQuery: generateDefaultListQuery().updatePage(1, 100),
        })
        expect(state1).not.toEqual(existingState1)
        expect(state2).toEqual({
          ...existingState2,
          teams: null,
          teamsLoading: true,
          teamsError: null,
        })
        expect(state2).not.toEqual(existingState2)
      })
    })

    describe('fetchTeamListSuccess action', () => {
      it('should retrieve team list and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          teams: null,
          teamsLoading: true,
          teamsError: null,
          teamsListQuery: generateDefaultListQuery().updatePage(1, 100),
        }
        const resp: GetTeamListResponse = {
          teams: [teamsTestData.findTeam(TeamName.ARGENTINA)],
          pageNumber: 1,
          pageSize: 100,
          filters: [],
        }

        // when
        const action1 = fetchTeamListSuccess({ resp })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...existingState,
          teams: resp.teams,
          teamsLoading: false,
          teamsError: null,
          teamsListQuery: generateDefaultListQuery().updatePage(1, 100),
        })
        expect(state1).not.toEqual(existingState)
      })
    })

    describe('fetchTeamListFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          teams: null,
          teamsLoading: true,
          teamsError: null,
          teamsListQuery: generateDefaultListQuery().updatePage(1, 100),
        }
        const error = `Can't find team list`

        // when
        const action1 = fetchTeamListFailure({ error })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...existingState,
          teamsLoading: false,
          teamsError: error,
        })
        expect(state1).not.toEqual(existingState)
      })
    })
  })

  describe('CreateTeam', () => {
    describe('createTeam action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const { description, name, logo } = teamsTestData.findTeam(TeamName.ARGENTINA)
        const existingState1 = reducer.initialState
        const req: CreateTeamRequest = {
          description,
          name,
          logo,
        }

        // when
        const action1 = createTeam({ req })
        const state1 = reducer.reducer(existingState1, action1)

        // then
        expect(state1).toEqual({
          ...existingState1,
          createTeamLoading: true,
          createTeamError: null,
        })
        expect(state1).not.toEqual(existingState1)
      })
    })

    describe('createTeamSuccess action', () => {
      it('should retrieve success response and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          createTeamLoading: true,
          createTeamError: null,
        }
        const resp: CreateTeamResponse = {
          ...teamsTestData.findTeam(TeamName.ARGENTINA),
        }

        // when
        const action1 = createTeamSuccess({ resp })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...existingState,
          lastCreatedTeam: teamsTestData.findTeam(TeamName.ARGENTINA),
          createTeamLoading: false,
          createTeamError: null,
        })
        expect(state1).not.toEqual(existingState)
      })
    })

    describe('createTeamFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          createTeamLoading: true,
          createTeamError: null,
        }
        const error = `Can't create the team`

        // when
        const action1 = createTeamFailure({ error })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...reducer.initialState,
          createTeamLoading: false,
          createTeamError: error,
        })
        expect(state1).not.toEqual(existingState)
      })
    })
  })

  describe('RemoteTeam', () => {
    describe('remoteTeam action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialState
        const existingState2 = {
          ...reducer.initialState,
          removeTeamsError: [{ id: 'cascasc', error: 'error' }],
        }
        const id = 'cascasc'

        // when
        const action1 = removeTeam({ id })
        const state1 = reducer.reducer(existingState1, action1)
        const action2 = removeTeam({ id })
        const state2 = reducer.reducer(existingState1, action2)

        // then
        expect(state1).toEqual({
          ...existingState1,
          removeTeamsError: [],
          removeTeamsLoading: [{ id: 'cascasc' }],
        })
        expect(state1).not.toEqual(existingState1)
        expect(state2).toEqual({
          ...existingState2,
          removeTeamsError: [],
          removeTeamsLoading: [{ id: 'cascasc' }],
        })
        expect(state2).not.toEqual(existingState2)
      })
    })

    describe('remoteTeamSuccess action', () => {
      it('should retrieve success response and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          removeTeamsError: [],
          removeTeamsLoading: [{ id: 'asfaasf' }, { id: 'cascasc' }, { id: '123e12' }],
        }

        // when
        const action1 = removeTeamSuccess({ id: 'cascasc' })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...reducer.initialState,
          removeTeamsError: [],
          removeTeamsLoading: [{ id: 'asfaasf' }, { id: '123e12' }],
        })
        expect(state1).not.toEqual(existingState)
      })
    })

    describe('remoteTeamFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          removeTeamsError: [],
          removeTeamsLoading: [{ id: 'asfaasf' }, { id: 'cascasc' }, { id: '123e12' }],
        }
        const error = `Can't remove the team`

        // when
        const action1 = removeTeamFailure({ id: 'cascasc', error })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...reducer.initialState,
          removeTeamsError: [{ id: 'cascasc', error }],
          removeTeamsLoading: [{ id: 'asfaasf' }, { id: '123e12' }],
        })
        expect(state1).not.toEqual(existingState)
      })
    })
  })

  describe('FetchTeam', () => {
    describe('fetchTeam action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialState
        const id = '1'

        // when
        const action1 = fetchTeam({ id })
        const state1 = reducer.reducer(existingState1, action1)

        // then
        expect(state1).toEqual({
          ...existingState1,
          team: null,
          teamLoading: true,
          teamError: null,
        })
        expect(state1).not.toEqual(existingState1)
      })
    })

    describe('fetchTeamSuccess action', () => {
      it('should retrieve success response and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          team: null,
          teamLoading: true,
          teamError: null,
        }
        const team = teamsTestData.findTeam(TeamName.ARGENTINA)

        // when
        const action1 = fetchTeamSuccess({ team })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...existingState,
          team: team,
          teamLoading: false,
          teamError: null,
        })
        expect(state1).not.toEqual(existingState)
      })
    })

    describe('fetchTeamFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          team: teamsTestData.findTeam(TeamName.ARGENTINA),
          teamLoading: false,
          teamError: null,
        }
        const error = `Can't find the team`

        // when
        const action1 = fetchTeamFailure({ error })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...reducer.initialState,
          team: null,
          teamLoading: false,
          teamError: error,
        })
        expect(state1).not.toEqual(existingState)
      })
    })
  })

  describe('UpdateTeam', () => {
    describe('updateTeam action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialState
        const { description, name, logo } = teamsTestData.findTeam(TeamName.ARGENTINA)
        const req: UpdateTeamRequest = {
          name,
          description,
          logo,
        }
        const id = '1'

        // when
        const action1 = updateTeam({ id, req })
        const state1 = reducer.reducer(existingState1, action1)

        // then
        expect(state1).toEqual({
          ...existingState1,
          updateTeamLoading: true,
          updateTeamError: null,
        })
        expect(state1).not.toEqual(existingState1)
      })
    })

    describe('updateTeamSuccess action', () => {
      it('should retrieve success response and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          updateTeamLoading: true,
          updateTeamError: null,
        }
        const team = teamsTestData.findTeam(TeamName.ARGENTINA)

        // when
        const action1 = updateTeamSuccess({ resp: team })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...existingState,
          // team is updated after call updateTeamSuccess Effect 
          team: team,
          updateTeamLoading: false,
          updateTeamError: null,
        })
        expect(state1).not.toEqual(existingState)
      })
    })

    describe('updateTeamFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialState,
          updateTeamLoading: true,
          updateTeamError: null,
        }
        const error = `Can't update the team`

        // when
        const action1 = updateTeamFailure({ error })
        const state1 = reducer.reducer(existingState, action1)

        // then

        expect(state1).toEqual({
          ...reducer.initialState,
          updateTeamLoading: false,
          updateTeamError: error,
        })
        expect(state1).not.toEqual(existingState)
      })
    })
  })
})
