import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppRemoteComponent } from './app-remote.component'

const routes: Routes = [
  {
    path: '',
    component: AppRemoteComponent,
    children: [
      {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full',
      },
      {
        path: 'teams',
        loadChildren: () => import('../feature/teams/feature/teams-shell/teams-shell.module').then((module) => module.TeamsShellModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRemoteRoutingModule {}
