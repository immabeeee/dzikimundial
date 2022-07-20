import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamsService } from '../../data-access/teams.service'
import { TeamItemModule } from '../team-item/team-item.module'
import { TeamListRoutingModule } from './team-list-routing.module'
import { TeamListComponent } from './team-list.component'

@NgModule({
  declarations: [TeamListComponent],
  imports: [CommonModule, TeamListRoutingModule, TeamItemModule],
  exports: [TeamListComponent],
  providers: [TeamsService],
})
export class TeamListModule {}
