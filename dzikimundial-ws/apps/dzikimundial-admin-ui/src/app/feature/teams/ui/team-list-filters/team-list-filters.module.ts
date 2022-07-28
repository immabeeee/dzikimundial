import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamsService } from '../../data-access/teams.service'
import { TeamItemModule } from '../team-item/team-item.module'
import { TeamListFiltersRoutingModule } from './team-list-filters-routing.module'
import { TeamListFiltersComponent } from './team-list-filters.component'
import { UiInputModule } from '@dzikimundial-ws/ui-input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TeamListFiltersFormService } from '../../data-access/team-list-filters-form.service'

@NgModule({
  declarations: [TeamListFiltersComponent],
  imports: [CommonModule, TeamListFiltersRoutingModule, TeamItemModule, UiInputModule, ReactiveFormsModule, FormsModule],
  exports: [TeamListFiltersComponent],
  providers: [TeamsService, TeamListFiltersFormService],
})
export class TeamListFiltersModule {}
