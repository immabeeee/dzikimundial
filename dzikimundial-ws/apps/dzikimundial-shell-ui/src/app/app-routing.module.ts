import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { loadRemoteModule } from '@angular-architects/module-federation'
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'ui',
    canLoad: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'dzikimundialUi',
        exposedModule: './Module',
      }).then((m) => m.AppRemoteModule),
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'dzikimundialAdminUi',
        exposedModule: './Module',
      }).then((m) => m.AppRemoteModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
