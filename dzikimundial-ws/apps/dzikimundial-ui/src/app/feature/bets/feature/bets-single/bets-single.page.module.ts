import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BetsSinglesService } from '../../data-access/bets-single/bets-singles.service'
import { BetsSingleListModule } from '../../ui/bet-single-list/bet-single-list.module'
import { BetsSinglePageRoutingModule } from './bets-single-page-routing.module'
import { BetsSingleComponent } from './bets-single.page'

@NgModule({
  declarations: [BetsSingleComponent],
  imports: [CommonModule, BetsSinglePageRoutingModule, BetsSingleListModule],
  exports: [],
  providers: [BetsSinglesService],
})
export class BetsSinglePageModule {}
