import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTER_LINK } from './models/route-links.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_LINK.BETS,
    pathMatch: 'full'
  },
  {
    path: ROUTER_LINK.BETS,
    loadChildren: () =>
      import('./bets/feature/bets-shell/bets-shell.module').then(
        (module) => module.BetsShellModule
      )
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
