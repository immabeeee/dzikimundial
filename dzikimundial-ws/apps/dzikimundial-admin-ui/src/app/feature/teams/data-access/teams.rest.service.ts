import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTeamListResponse } from '@dzikimundial-ws/api-interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TeamsRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly httpClient: HttpClient) {}

  public fetchTeamList(pageNumber: number, pageSize: number): Observable<GetTeamListResponse> {
    const path = `/team/teams?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpClient.get<GetTeamListResponse>(
      `${environment.baseApiUrl}${path}`,
    );
  }
}
