import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamsBrowserPageComponent } from './teams-browser.page'

const routes: Routes = [
  {
    path: '',
    component: TeamsBrowserPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsBrowserPageRoutingModule {}
