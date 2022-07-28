import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamCreatePageRoutingModule } from './team-create-page-routing.module'
import { TeamCreatePageComponent } from './team-create.page'
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link'
import { TeamFormService } from '../../data-access/team-form.service'
import { TeamItemModule } from '../../ui/team-item/team-item.module'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'
import { TeamService } from '../../data-access/team.service'
import { TeamFormModule } from '../team-form/team-form.module'

@NgModule({
  declarations: [TeamCreatePageComponent],
  imports: [
    CommonModule,
    TeamCreatePageRoutingModule,
    UiNavLinkModule,
    TeamItemModule,
    UiButtonModule,
    TeamFormModule
  ],
  exports: [],
  providers: [TeamFormService, TeamService],
})
export class TeamCreatePageModule {}
