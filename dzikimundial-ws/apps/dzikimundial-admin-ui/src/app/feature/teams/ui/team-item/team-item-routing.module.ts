import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamItemComponent } from './team-item.component'

const routes: Routes = [
  {
    path: '',
    component: TeamItemComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamItemRoutingModule {}
