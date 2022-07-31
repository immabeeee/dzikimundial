import { Injectable } from '@angular/core'
import { ListQuery } from '@dzikimundial-ws/api-interfaces'
import { Store } from '@ngrx/store'
import * as TeamsStateActions from './state/teams-state.actions'

@Injectable()
export class TeamsService {
  constructor(private store: Store) {}

  public fetchTeams(listQuery?: ListQuery): void {
    this.store.dispatch(TeamsStateActions.fetchTeamList({ listQuery }))
  }
}
