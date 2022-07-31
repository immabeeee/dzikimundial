import { TestBed } from '@angular/core/testing'
import { TeamRestService } from './team.rest.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import {
  generateDefaultListQuery,
  GetTeamListResponse,
  GetTeamResponse,
  Sort,
  SortDirection,
} from '@dzikimundial-ws/api-interfaces'
import { first } from 'rxjs'
import { environment } from './../../../../environments/environment'

describe('TeamRestService', () => {
  let service: TeamRestService
  let httpMock: HttpTestingController

  afterEach(() => {
    httpMock.verify()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamRestService],
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(TeamRestService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return an observable with GetTeamListResponse', () => {
    // given
    const id = '1'
    const newDate = new Date()
    const expectedResult: GetTeamResponse = {
      id: '1',
      description: 'polish team',
      name: 'Poland',
      logo: 'http://logo.com/logo.svg',
      createdAt: newDate,
      createdBy: '1',
      updatedAt: newDate,
      updatedBy: '1',
    }

    // when
    service
      .fetchTeam(id)
      .pipe(first())
      .subscribe((resp: GetTeamResponse) => {
        // then
        expect(resp).toBeTruthy()
        expect(resp).toEqual(expectedResult)
      })

    const req = httpMock.expectOne(`${environment.baseApiUrl}/team/${id}`)
    // then
    expect(req.request.method).toBe('GET')
    req.flush(expectedResult)
  })
})
