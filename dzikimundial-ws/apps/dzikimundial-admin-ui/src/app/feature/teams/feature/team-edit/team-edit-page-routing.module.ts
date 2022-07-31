import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamEditPageComponent } from './team-edit.page'

const routes: Routes = [
  {
    path: '',
    component: TeamEditPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamEditPageRoutingModule {}
