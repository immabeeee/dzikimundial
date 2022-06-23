import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BetsSingleComponent } from './bets-single.page'

const routes: Routes = [
  {
    path: '',
    component: BetsSingleComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetsSinglePageRoutingModule {}
