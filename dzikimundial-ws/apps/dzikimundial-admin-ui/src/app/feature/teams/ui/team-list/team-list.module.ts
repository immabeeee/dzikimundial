import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamsRestService } from '../../data-access/teams.rest.service'
import { TeamsService } from '../../data-access/teams.service'
import { TeamItemModule } from '../team-item/team-item.module'
import { TeamListRoutingModule } from './team-list-routing.module'
import { TeamListComponent } from './team-list.component'
import { UiProgressBarModule } from '@dzikimundial-ws/ui-progress-bar'
import { UiMessageModule } from '@dzikimundial-ws/ui-message'

@NgModule({
  declarations: [TeamListComponent],
  imports: [CommonModule, TeamListRoutingModule, TeamItemModule, UiProgressBarModule, UiMessageModule],
  exports: [TeamListComponent],
  providers: [TeamsService, TeamsRestService],
})
export class TeamListModule {}
