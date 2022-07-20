import { Injectable } from '@angular/core'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import * as testData from './../test/teams.test-data'

@Injectable()
export class TeamsService {
  private teams$ = new BehaviorSubject<Team[]>([])

  public getTeams$(): Observable<Team[]> {
    return this.teams$
  }

  public fetchTeams(): void {
    this.teams$.next(testData.teams)
  }
}
