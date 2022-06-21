import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BETS_ROUTER_LINK } from '../../models/route-links.model'
import { BetsBrowserPageComponent } from './bets-browser.page'

const routes: Routes = [
  {
    path: '',
    component: BetsBrowserPageComponent,
    children: [
      {
        path: '',
        redirectTo: BETS_ROUTER_LINK.GROUPS,
        pathMatch: 'full',
      },
      {
        path: BETS_ROUTER_LINK.GROUPS,
        loadChildren: () =>
          import('../bets-groups/bets-groups.page.module').then((module) => module.BetsGroupsPageModule),
      },
      {
        path: BETS_ROUTER_LINK.SINGLE,
        loadChildren: () =>
          import('../bets-single/bets-single.page.module').then((module) => module.BetsSinglePageModule),
      },
      {
        path: BETS_ROUTER_LINK.WINNERS,
        loadChildren: () =>
          import('../bets-groups/bets-groups.page.module').then((module) => module.BetsGroupsPageModule),
      },
      {
        path: BETS_ROUTER_LINK.BEST,
        loadChildren: () =>
          import('../bets-groups/bets-groups.page.module').then((module) => module.BetsGroupsPageModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetsBrowserPageRoutingModule {}
