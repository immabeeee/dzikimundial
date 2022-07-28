import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { UiTooltipModule } from '@dzikimundial-ws/ui-tooltip'
import { TeamsService } from '../../data-access/teams.service'
import { TeamItemRoutingModule } from './team-item-routing.module'
import { TeamItemComponent } from './team-item.component'
import { UiTeamInfoModule } from '@dzikimundial-ws/ui-team-info'
import { TeamService } from '../../data-access/team.service'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [TeamItemComponent],
  imports: [CommonModule, TeamItemRoutingModule, UiIconButtonModule, UiTooltipModule, UiTeamInfoModule, RouterModule],
  exports: [TeamItemComponent],
  providers: [TeamsService, TeamService],
})
export class TeamItemModule {}
