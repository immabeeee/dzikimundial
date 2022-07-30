import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { first, Observable, of, throwError } from 'rxjs'
import { TeamRestService } from '../team.rest.service'
import { TeamsRestService } from '../teams.rest.service'
import { TeamsStateEffects } from './teams-state.effects'
import { TeamsStateEntity } from './teams-state.models'
import { initialState } from './teams-state.reducer'
import { provideMockActions } from '@ngrx/effects/testing'
import * as TeamsActions from './teams-state.actions'
import { CreateTeamResponse, GetTeamListResponse, GetTeamResponse, TeamName, UpdateTeamResponse } from '@dzikimundial-ws/api-interfaces'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrService } from 'ngx-toastr'
import { Action } from '@ngrx/store'
import { subscribeSpyTo, SubscriberSpy } from '@hirez_io/observer-spy'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { Router } from '@angular/router'

describe('TeamsState Effects', () => {
  let actions$: Observable<any>
  let effects: TeamsStateEffects
  let store: MockStore<TeamsStateEntity>
  let restTeamService: TeamRestService
  let restTeamsService: TeamsRestService
  let obsSpy: SubscriberSpy<Action>
  let router: Router
  const TeamRestServiceMock = {
    fetchTeam: jest.fn(),
    createTeam: jest.fn(),
    updateTeam: jest.fn(),
    removeTeam: jest.fn(),
  }
  const TeamsRestServiceMock = {
    fetchTeamList: jest.fn(),
  }
  const ToastrServiceMock = {
    success: jest.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TeamsStateEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: TeamRestService, useValue: TeamRestServiceMock },
        { provide: TeamsRestService, useValue: TeamsRestServiceMock },
        { provide: ToastrService, useValue: ToastrServiceMock },
      ],
    })
    effects = TestBed.inject(TeamsStateEffects)
    store = TestBed.inject(MockStore)
    restTeamService = TestBed.inject(TeamRestService)
    restTeamsService = TestBed.inject(TeamsRestService)
    router = TestBed.inject(Router)
  })

  afterEach(() => obsSpy?.unsubscribe())

  describe('onFetchTeamList$', () => {
    it('should fire FetchTeamListSuccess', () => {
      const response: GetTeamListResponse = { teams: [], pageNumber: 0, pageSize: 10, filters: [], sort: undefined }
      jest.spyOn(restTeamsService, 'fetchTeamList').mockReturnValueOnce(of(response))

      actions$ = of(TeamsActions.fetchTeamList)

      obsSpy = subscribeSpyTo(effects.fetchTeamList$)
      expect(obsSpy.getFirstValue()).toEqual(TeamsActions.fetchTeamListSuccess({ resp: response }))
    })

    it('should fire FetchTeamFailure', () => {
      const error = 'OOPS!'
      jest.spyOn(restTeamsService, 'fetchTeamList').mockImplementation(() => {
        return throwError(() => new Error(error))
      })

      actions$ = of(TeamsActions.fetchTeamList)

      obsSpy = subscribeSpyTo(effects.fetchTeamList$, { expectErrors: true })
      expect(obsSpy.getFirstValue().type).toContain(TeamsActions.fetchTeamListFailure({ error }).type)
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain('OOPS!')
    })
  })

  describe('onFetchTeam$', () => {
    it('should fire FetchTeamSuccess', () => {
      const response: GetTeamResponse = teamsTestData.findTeam(TeamName.ARGENTINA)
      jest.spyOn(restTeamService, 'fetchTeam').mockReturnValueOnce(of(response))

      actions$ = of(TeamsActions.fetchTeam)

      obsSpy = subscribeSpyTo(effects.fetchTeam$)
      expect(obsSpy.getFirstValue()).toEqual(TeamsActions.fetchTeamSuccess({ team: response }))
    })

    it('should fire FetchTeamFailure', () => {
      const error = 'OOPS!'
      jest.spyOn(restTeamService, 'fetchTeam').mockImplementation(() => {
        return throwError(() => new Error(error))
      })

      actions$ = of(TeamsActions.fetchTeam)

      obsSpy = subscribeSpyTo(effects.fetchTeam$, { expectErrors: true })
      expect(obsSpy.getFirstValue().type).toContain(TeamsActions.fetchTeamFailure({ error }).type)
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain('OOPS!')
    })
  })

  describe('onUpdateTeam$', () => {
    it('should fire UpdateTeamSuccess', () => {
      const { description, logo, name } = teamsTestData.findTeam(TeamName.ARGENTINA)
      const response: UpdateTeamResponse = { name, logo, description }
      jest.spyOn(restTeamService, 'updateTeam').mockReturnValueOnce(of(response))

      actions$ = of(TeamsActions.updateTeam)

      obsSpy = subscribeSpyTo(effects.updateTeam$)
      expect(obsSpy.getFirstValue()).toEqual(TeamsActions.updateTeamSuccess({ resp: response }))
    })

    it('should fire UpdateTeamFailure', () => {
      const error = 'OOPS!'
      jest.spyOn(restTeamService, 'updateTeam').mockImplementation(() => {
        return throwError(() => new Error(error))
      })

      actions$ = of(TeamsActions.updateTeam)

      obsSpy = subscribeSpyTo(effects.updateTeam$, { expectErrors: true })
      expect(obsSpy.getFirstValue().type).toContain(TeamsActions.updateTeamFailure({ error }).type)
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain('OOPS!')
    })
  })

  describe('onUpdateTeamSuccess$', () => {
    it('should navigate to team list page', () => {
      jest.spyOn(router, 'navigate')

      actions$ = of(TeamsActions.updateTeamSuccess)

      obsSpy = subscribeSpyTo(effects.updateTeamSuccess$)
      expect(router.navigate).toHaveBeenCalledWith(['../'])
    })
  })

  describe('onCreateTeam$', () => {
    it('should fire CreateTeamSuccess', () => {
      const { description, logo, name } = teamsTestData.findTeam(TeamName.ARGENTINA)
      const response: CreateTeamResponse = { name, logo, description }
      jest.spyOn(restTeamService, 'createTeam').mockReturnValueOnce(of(response))

      actions$ = of(TeamsActions.createTeam)

      obsSpy = subscribeSpyTo(effects.createTeam$)
      expect(obsSpy.getFirstValue()).toEqual(TeamsActions.createTeamSuccess({ resp: response }))
    })

    it('should fire CreateTeamFailure', () => {
      const error = 'OOPS!'
      jest.spyOn(restTeamService, 'createTeam').mockImplementation(() => {
        return throwError(() => new Error(error))
      })

      actions$ = of(TeamsActions.createTeam)

      obsSpy = subscribeSpyTo(effects.createTeam$, { expectErrors: true })
      expect(obsSpy.getFirstValue().type).toContain(TeamsActions.createTeamFailure({ error }).type)
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain('OOPS!')
    })
  })

  describe('onCreateTeamSuccess$', () => {
    it('should navigate to team list page', () => {
      jest.spyOn(router, 'navigate')

      actions$ = of(TeamsActions.createTeamSuccess)

      obsSpy = subscribeSpyTo(effects.createTeamSuccess$)
      expect(router.navigate).toHaveBeenCalledWith(['../'])
    })
  })

  describe('removeTeam$', () => {
    it('should fire RemoveTeamSuccess', () => {
      jest.spyOn(restTeamService, 'removeTeam').mockReturnValueOnce(
        of({
          raw: {},
          affected: 1,
        }),
      )

      actions$ = of(TeamsActions.removeTeam({ id: '1' }))

      obsSpy = subscribeSpyTo(effects.removeTeam$)
      expect(obsSpy.getFirstValue()).toEqual(TeamsActions.removeTeamSuccess({ id: '1' }))
    })

    it('should fire RemoveTeamFailure', () => {
      const error = 'OOPS!'
      jest.spyOn(restTeamService, 'removeTeam').mockImplementation(() => {
        return throwError(() => new Error(error))
      })

      actions$ = of(TeamsActions.removeTeam({ id: '1' }))

      obsSpy = subscribeSpyTo(effects.removeTeam$, { expectErrors: true })
      expect(obsSpy.getFirstValue().type).toContain(TeamsActions.removeTeamFailure({ id: '1', error }).type)
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain('OOPS!')
    })
  })
})
