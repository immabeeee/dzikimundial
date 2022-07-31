import { TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { initialState } from './state/teams-state.reducer'
import { TeamsService } from './teams.service'
import { generateDefaultListQuery } from '@dzikimundial-ws/api-interfaces'

describe('TeamsService', () => {
  let service: TeamsService
  let store: MockStore
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({
          initialState,
        }),
        TeamsService,
      ],
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(TeamsService)
    store = TestBed.inject(MockStore)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('fetchTeams', () => {
    it('should dispatch action after call fetch teams method without listQuery', () => {
      // given
      jest.spyOn(service, 'fetchTeams')
      jest.spyOn(store, 'dispatch')
      // when
      service.fetchTeams()
      // then
      expect(service.fetchTeams).toBeCalledWith()
      expect(store.dispatch).toHaveBeenCalledWith({ listQuery: undefined, type: '[Teams/API] Fetch Team List' })
    })

    it('should dispatch action after call fetch teams method', () => {
      // given
      const listQuery = generateDefaultListQuery()
      jest.spyOn(service, 'fetchTeams')
      jest.spyOn(store, 'dispatch')
      // when
      service.fetchTeams(listQuery)
      // then
      expect(service.fetchTeams).toBeCalledWith(listQuery)
      expect(store.dispatch).toHaveBeenCalledWith({ listQuery: listQuery, type: '[Teams/API] Fetch Team List' })
    })
  })
})
