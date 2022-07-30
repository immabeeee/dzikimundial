import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { initialState } from './state/teams-state.reducer'
import { TeamService } from './team.service'
import { CreateTeamRequest, UpdateTeamRequest } from '@dzikimundial-ws/api-interfaces'

describe('TeamService', () => {
  let service: TeamService
  let store: MockStore
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({
          initialState,
        }),
        TeamService,
      ],
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(TeamService)
    store = TestBed.inject(MockStore)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should dispatch action after call fetch team', () => {
    // given
    const id = '1'
    jest.spyOn(service, 'fetchTeam')
    jest.spyOn(store, 'dispatch')
    // when
    service.fetchTeam(id)
    // then
    expect(service.fetchTeam).toBeCalledWith(id)
    expect(store.dispatch).toHaveBeenCalledWith({ id: id, type: '[Teams/API] Fetch Team' })
  })

  it('should dispatch action after call create team', () => {
    // given
    const req: CreateTeamRequest = {
      description: 'polish team',
      name: 'Poland',
      logo: 'http://logo.com/logo.svg',
    }
    jest.spyOn(service, 'createTeam')
    jest.spyOn(store, 'dispatch')
    // when
    service.createTeam(req)
    // then
    expect(service.createTeam).toBeCalledWith(req)
    expect(store.dispatch).toHaveBeenCalledWith({ req, type: '[Teams/API] Create Team' })
  })

  it('should dispatch action after call update team', () => {
    // given
    const id = '1'
    const req: UpdateTeamRequest = {
      description: 'polish team',
      name: 'Poland',
      logo: 'http://logo.com/logo.svg',
    }
    jest.spyOn(service, 'updateTeam')
    jest.spyOn(store, 'dispatch')
    // when
    service.updateTeam(id, req)
    // then
    expect(service.updateTeam).toBeCalledWith(id, req)
    expect(store.dispatch).toHaveBeenCalledWith({ id, req, type: '[Teams/API] Update Team' })
  })

  it('should dispatch action after call remove team', () => {
    // given
    const id = '1'
    jest.spyOn(service, 'removeTeam')
    jest.spyOn(store, 'dispatch')
    // when
    service.removeTeam(id)
    // then
    expect(service.removeTeam).toBeCalledWith(id)
    expect(store.dispatch).toHaveBeenCalledWith({ id, type: '[Teams/API] Remove Team' })
  })
})
