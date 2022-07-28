import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamListFiltersComponent } from './team-list-filters.component'

const routes: Routes = [
  {
    path: '',
    component: TeamListFiltersComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamListFiltersRoutingModule {}
