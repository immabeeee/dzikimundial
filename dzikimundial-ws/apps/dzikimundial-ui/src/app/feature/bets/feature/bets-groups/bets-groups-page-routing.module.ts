import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BetsGroupsComponent } from './bets-groups.page'

const routes: Routes = [
  {
    path: '',
    component: BetsGroupsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetsGroupsPageRoutingModule {}
