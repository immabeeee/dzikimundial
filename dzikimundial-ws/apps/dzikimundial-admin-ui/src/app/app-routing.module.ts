import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { environment } from '../environments/environment'
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.appPrefix,
    pathMatch: 'full',
  },
  {
    path: environment.appPrefix,
    canLoad: [AuthGuard],
    loadChildren: () => import('./remote/app-remote.module').then((m) => m.AppRemoteModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
