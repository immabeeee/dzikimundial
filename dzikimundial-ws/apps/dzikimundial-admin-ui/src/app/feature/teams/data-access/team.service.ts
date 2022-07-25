import { Injectable } from '@angular/core'
import { CreateTeamRequest, UpdateTeamRequest } from '@dzikimundial-ws/api-interfaces'
import { Store } from '@ngrx/store'
import * as TeamsStateActions from './state/teams-state.actions'

@Injectable()
export class TeamService {
  constructor(private store: Store) {}

  public fetchTeam(id: string): void {
    this.store.dispatch(TeamsStateActions.fetchTeam({ id }))
  }

  public createTeam(req: CreateTeamRequest): void {
    this.store.dispatch(TeamsStateActions.createTeam({ req }))
  }

  public updateTeam(id: string, req: UpdateTeamRequest): void {
    this.store.dispatch(TeamsStateActions.updateTeam({ id, req }))
  }

  public removeTeam(id: string): void {
    this.store.dispatch(TeamsStateActions.removeTeam({ id }))
  }
}
