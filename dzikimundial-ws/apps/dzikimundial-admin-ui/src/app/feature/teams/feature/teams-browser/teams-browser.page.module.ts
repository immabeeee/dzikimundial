import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamListFiltersModule } from '../team-list-filters/team-list-filters.module'
import { TeamListModule } from '../team-list/team-list.module'
import { TeamsBrowserPageRoutingModule } from './teams-browser-page-routing.module'
import { TeamsBrowserPageComponent } from './teams-browser.page'
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link'

@NgModule({
  declarations: [TeamsBrowserPageComponent],
  imports: [CommonModule, TeamsBrowserPageRoutingModule, TeamListModule, TeamListFiltersModule, UiNavLinkModule],
  exports: [TeamsBrowserPageComponent],
  providers: [],
})
export class TeamsBrowserPageModule {}
