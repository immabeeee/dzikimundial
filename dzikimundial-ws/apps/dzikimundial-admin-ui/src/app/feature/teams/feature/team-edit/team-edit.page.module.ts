import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamEditPageRoutingModule } from './team-edit-page-routing.module'
import { TeamEditPageComponent } from './team-edit.page'
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link'
import { UiInputModule } from '@dzikimundial-ws/ui-input'
import { TeamFormService } from '../../data-access/team-form.service'
import { ReactiveFormsModule } from '@angular/forms'
import { TeamItemModule } from '../../ui/team-item/team-item.module'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'
import { TeamService } from '../../data-access/team.service'
import { UiProgressBarModule } from '@dzikimundial-ws/ui-progress-bar'
import { TeamFormModule } from '../team-form/team-form.module'

@NgModule({
  declarations: [TeamEditPageComponent],
  imports: [
    CommonModule,
    TeamEditPageRoutingModule,
    UiNavLinkModule,
    TeamItemModule,
    UiButtonModule,
    UiProgressBarModule,
    TeamFormModule
  ],
  exports: [],
  providers: [TeamFormService, TeamService],
})
export class TeamEditPageModule {}
