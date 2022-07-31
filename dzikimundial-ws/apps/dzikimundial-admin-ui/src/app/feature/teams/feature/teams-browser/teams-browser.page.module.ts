import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamsBrowserPageRoutingModule } from './teams-browser-page-routing.module'
import { TeamsBrowserPageComponent } from './teams-browser.page'
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link'
import { TeamListModule } from '../../ui/team-list/team-list.module'
import { TeamListFiltersModule } from '../../ui/team-list-filters/team-list-filters.module'

@NgModule({
  declarations: [TeamsBrowserPageComponent],
  imports: [CommonModule, TeamsBrowserPageRoutingModule, TeamListModule, TeamListFiltersModule, UiNavLinkModule],
  exports: [TeamsBrowserPageComponent],
  providers: [],
})
export class TeamsBrowserPageModule {}
