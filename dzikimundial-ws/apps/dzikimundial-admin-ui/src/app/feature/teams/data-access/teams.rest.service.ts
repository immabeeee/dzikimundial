import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { GetTeamListRequest, GetTeamListResponse, ListQuery } from '@dzikimundial-ws/api-interfaces'
import { environment } from '../../../../environments/environment'

@Injectable()
export class TeamsRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private readonly httpClient: HttpClient) {}

  public fetchTeamList(listQuery: ListQuery): Observable<GetTeamListResponse> {
    const path = `/team/teams`
    const req: GetTeamListRequest = {
      pageNumber: listQuery.page.pageNumber,
      pageSize: listQuery.page.pageSize,
      filters: listQuery.filters,
      sort: listQuery.sort,
    }
    return this.httpClient.post<GetTeamListResponse>(`${environment.baseApiUrl}${path}`, req, this.httpOptions)
  }
}
