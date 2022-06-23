import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { loadRemoteModule } from '@angular-architects/module-federation'
import { microFrontends } from './consts/microfrontends.const'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  // ...microFrontends.map((mf) => ({
  //   path: mf.baseUrl,
  //   loadChildren: () =>
  //     loadRemoteModule({
  //       remoteEntry: mf.remoteEntry,
  //       remoteName: mf.remoteName,
  //       exposedModule: mf.exposedModule,
  //     }).then((m) => m[mf.moduleName]),
  // })),
  {
    path: 'ui',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteName: 'dzikimundialUi',
        exposedModule: './Module',
      }).then((m) => m.AppRemoteModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'dzikimundialAdminUi',
        exposedModule: './Module',
      }).then((m) => m.AppRemoteModule),
  },
  {
    path: 'lorem',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'dzikimundialLorem',
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
