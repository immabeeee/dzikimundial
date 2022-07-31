import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  public api = 'http://localhost:3000/api'

  constructor(private readonly httpClient: HttpClient) {}

  public signUp(request: any): Observable<any> {
    const path = '/auth/register'
    return this.httpClient.post<any>(`${this.api}${path}`, request, this.httpOptions)
  }

  public signIn(request: any): Observable<any> {
    const path = '/auth/login'
    return this.httpClient.post<any>(`${this.api}${path}`, request, this.httpOptions)
  }
}
