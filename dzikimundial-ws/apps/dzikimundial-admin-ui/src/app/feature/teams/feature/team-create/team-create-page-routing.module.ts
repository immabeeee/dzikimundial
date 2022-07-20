import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamCreatePageComponent } from './team-create.page'

const routes: Routes = [
  {
    path: '',
    component: TeamCreatePageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamCreatePageRoutingModule {}
