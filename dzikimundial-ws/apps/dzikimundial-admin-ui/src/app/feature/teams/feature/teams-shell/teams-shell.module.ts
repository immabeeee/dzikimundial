import { NgModule } from '@angular/core'
import { TeamsShellRoutingModule } from './teams-shell-routing.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromTeamsState from '../../data-access/state/teams-state.reducer'
import { TeamsStateEffects } from '../../data-access/state/teams-state.effects'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamsRestService } from '../../data-access/teams.rest.service'
import { TeamRestService } from '../../data-access/team.rest.service'

@NgModule({
  imports: [
    TeamsShellRoutingModule,
    StoreModule.forFeature(fromTeamsState.TEAMS_STATE_FEATURE_KEY, fromTeamsState.reducer),
    EffectsModule.forFeature([TeamsStateEffects]),
  ],
  providers: [TeamsStateFacade, TeamsRestService, TeamRestService],
})
export class TeamsShellModule {}
