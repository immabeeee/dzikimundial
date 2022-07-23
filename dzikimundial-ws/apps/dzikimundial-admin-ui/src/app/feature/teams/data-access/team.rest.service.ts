import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTeamRequest, CreateTeamResponse } from '@dzikimundial-ws/api-interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TeamRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly httpClient: HttpClient) {}

  public createTeam(req: CreateTeamRequest): Observable<CreateTeamResponse> {
    const path = `/team/create`;
    return this.httpClient.post<CreateTeamResponse>(
      `${environment.baseApiUrl}${path}`,
      req,
      this.httpOptions
    );
  }
}
