import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as TeamsStateActions from './teams-state.actions'
import { CreateTeamView, RemoveTeamsView, TeamListView, TeamView, UpdateTeamView } from './teams-state.models'
import * as TeamsStateSelectors from './teams-state.selectors'

@Injectable()
export class TeamsStateFacade {
  loaded$ = this.store.pipe(select(TeamsStateSelectors.getTeamsStateLoaded))
  allTeamsState$ = this.store.pipe(select(TeamsStateSelectors.getAllTeamsState))
  selectedTeamsState$ = this.store.pipe(select(TeamsStateSelectors.getSelected))
  teamListView$: Observable<TeamListView> = this.store.pipe(select(TeamsStateSelectors.getTeamListView) as any)
  createTeamView$: Observable<CreateTeamView> = this.store.pipe(select(TeamsStateSelectors.getCreateTeamView) as any)
  updateTeamView$: Observable<UpdateTeamView> = this.store.pipe(select(TeamsStateSelectors.getUpdateTeamView) as any)
  removeTeamView$: Observable<RemoveTeamsView> = this.store.pipe(select(TeamsStateSelectors.getRemoveTeamsView) as any)
  team$: Observable<TeamView> = this.store.pipe(select(TeamsStateSelectors.getTeamView) as any)

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(TeamsStateActions.init())
  }
}
