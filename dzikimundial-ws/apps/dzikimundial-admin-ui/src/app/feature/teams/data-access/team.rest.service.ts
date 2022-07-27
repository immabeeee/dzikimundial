import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { delay, Observable } from 'rxjs'
import {
  CreateTeamRequest,
  CreateTeamResponse,
  DeleteResult,
  GetTeamResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from '@dzikimundial-ws/api-interfaces'
import { environment } from '../../../../environments/environment'

@Injectable()
export class TeamRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private readonly httpClient: HttpClient) {}

  public fetchTeam(id: string): Observable<GetTeamResponse> {
    const path = `/team/${id}`
    return this.httpClient.get<GetTeamResponse>(`${environment.baseApiUrl}${path}`)
  }

  public createTeam(req: CreateTeamRequest): Observable<CreateTeamResponse> {
    const path = `/team`
    return this.httpClient.post<CreateTeamResponse>(`${environment.baseApiUrl}${path}`, req, this.httpOptions)
  }

  public updateTeam(id: string, req: UpdateTeamRequest): Observable<UpdateTeamResponse> {
    const path = `/team/${id}`
    return this.httpClient.put<CreateTeamResponse>(`${environment.baseApiUrl}${path}`, req, this.httpOptions).pipe(delay(5000))
  }

  public removeTeam(id: string): Observable<DeleteResult> {
    const path = `/team/${id}`
    return this.httpClient.delete<DeleteResult>(`${environment.baseApiUrl}${path}`).pipe(delay(5000))
  }
}
