import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamCreatePageRoutingModule } from './team-create-page-routing.module'
import { TeamCreatePageComponent } from './team-create.page'
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link'
import { UiInputModule } from '@dzikimundial-ws/ui-input'
import { TeamFormService } from '../../data-access/team-form.service'
import { ReactiveFormsModule } from '@angular/forms'
import { TeamItemModule } from '../team-item/team-item.module'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'

@NgModule({
  declarations: [TeamCreatePageComponent],
  imports: [
    CommonModule,
    TeamCreatePageRoutingModule,
    UiNavLinkModule,
    UiInputModule,
    ReactiveFormsModule,
    TeamItemModule,
    UiButtonModule
  ],
  exports: [],
  providers: [TeamFormService],
})
export class TeamsBrowserPageModule {}
