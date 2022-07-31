import { TestBed } from '@angular/core/testing'
import { TeamsRestService } from './teams.rest.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { generateDefaultListQuery, GetTeamListResponse, Sort, SortDirection } from '@dzikimundial-ws/api-interfaces'
import { first } from 'rxjs'
import { environment } from './../../../../environments/environment'

describe('TeamsRestService', () => {
  let service: TeamsRestService
  let httpMock: HttpTestingController

  afterEach(() => {
    httpMock.verify()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamsRestService],
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(TeamsRestService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return an observable with GetTeamListResponse', () => {
    // given
    const listQuery = generateDefaultListQuery()
    const expectedResult: GetTeamListResponse = {
      teams: [],
      pageNumber: 0,
      pageSize: 10,
      filters: [],
      sort: new Sort('name', SortDirection.ASC),
    }
    // when
    service
      .fetchTeamList(listQuery.updateSort(new Sort('name', SortDirection.ASC)))
      .pipe(first())
      .subscribe((resp: GetTeamListResponse) => {
        // then
        expect(resp).toBeTruthy()
        expect(resp.filters).toEqual([])
        expect(resp.sort).toEqual(new Sort('name', SortDirection.ASC))
        expect(resp.pageNumber).toEqual(0)
        expect(resp.pageSize).toEqual(10)
        expect(resp.teams).toEqual([])
      })

    const req = httpMock.expectOne(`${environment.baseApiUrl}/team/teams`)
    // then
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({
      filters: [],
      pageNumber: 0,
      pageSize: 10,
      sort: new Sort('name', SortDirection.ASC),
    })
    req.flush(expectedResult)
  })
})
