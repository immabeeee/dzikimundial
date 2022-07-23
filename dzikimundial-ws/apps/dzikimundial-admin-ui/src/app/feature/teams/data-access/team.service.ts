import { Injectable } from '@angular/core'
import { CreateTeamRequest } from '@dzikimundial-ws/api-interfaces'
import { Store } from '@ngrx/store'
import * as TeamsStateActions from './state/teams-state.actions'

@Injectable()
export class TeamService {
  constructor(private store: Store){}

  public createTeam(req: CreateTeamRequest): void {
    this.store.dispatch(TeamsStateActions.createTeam({ req }))
  }
}
