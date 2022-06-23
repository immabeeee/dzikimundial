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
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('../feature/users/feature/users/users.module').then((module) => module.UsersModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRemoteRoutingModule {}
