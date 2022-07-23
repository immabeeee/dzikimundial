import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as TeamsStateActions from './state/teams-state.actions'

@Injectable()
export class TeamsService {
  constructor(private store: Store){}

  public fetchTeams(pageNumber: number, pageSize: number): void {
    this.store.dispatch(TeamsStateActions.fetchTeamList({ pageNumber, pageSize }))
  }
}
