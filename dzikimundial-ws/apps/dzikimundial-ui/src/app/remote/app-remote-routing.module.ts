import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ROUTER_LINK } from '../models/route-links.model'
import { AppRemoteComponent } from './app-remote.component'

const routes: Routes = [
  {
    path: '',
    component: AppRemoteComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTER_LINK.BETS,
        pathMatch: 'full',
      },
      {
        path: ROUTER_LINK.BETS,
        loadChildren: () =>
          import('../feature/bets/feature/bets-shell/bets-shell.module').then((module) => module.BetsShellModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRemoteRoutingModule {}
