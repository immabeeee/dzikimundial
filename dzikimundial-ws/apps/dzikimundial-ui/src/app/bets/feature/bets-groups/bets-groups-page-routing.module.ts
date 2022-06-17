import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BetsBrowserGroupsComponent } from './bets-groups.page'

const routes: Routes = [
  {
    path: '',
    component: BetsBrowserGroupsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetsGroupsPageRoutingModule {}
