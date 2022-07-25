import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ROUTER_LINK } from './../../../../models/route-links.model'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../teams-browser/teams-browser.page.module').then((module) => module.TeamsBrowserPageModule),
  },
  {
    path: ROUTER_LINK.TEAM_CREATE,
    loadChildren: () => import('../team-create/team-create.page.module').then((module) => module.TeamCreatePageModule),
  },
  {
    path: `${ROUTER_LINK.TEAM_EDIT}/:id`,
    loadChildren: () => import('../team-edit/team-edit.page.module').then((module) => module.TeamEditPageModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsShellRoutingModule {}
