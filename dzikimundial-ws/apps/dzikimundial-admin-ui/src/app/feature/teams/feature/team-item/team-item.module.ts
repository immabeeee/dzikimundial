import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { UiTooltipModule } from '@dzikimundial-ws/ui-tooltip'
import { TeamsService } from '../../data-access/teams.service'
import { TeamItemRoutingModule } from './team-item-routing.module'
import { TeamItemComponent } from './team-item.component'
import { UiTeamInfoModule } from '@dzikimundial-ws/ui-team-info'

@NgModule({
  declarations: [TeamItemComponent],
  imports: [CommonModule, TeamItemRoutingModule, UiIconButtonModule, UiTooltipModule, UiTeamInfoModule],
  exports: [TeamItemComponent],
  providers: [TeamsService],
})
export class TeamItemModule {}
