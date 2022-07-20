import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../teams-browser/teams-browser.page.module').then((module) => module.TeamsBrowserPageModule),
  },
  {
    path: 'create',
    loadChildren: () =>
    import('../team-create/team-create.page.module').then((module) => module.TeamsBrowserPageModule),
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsShellRoutingModule {}
