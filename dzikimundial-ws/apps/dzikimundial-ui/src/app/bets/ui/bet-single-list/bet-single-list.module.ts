import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BetsGroupModule } from '../bet-group/bet-group.module'
import { BetsSingleGroupModule } from '../bet-single-group/bet-single-group.module'
import { BetSingleListComponent } from './bet-single-list.component'

@NgModule({
  declarations: [BetSingleListComponent],
  imports: [CommonModule, BetsGroupModule, BetsSingleGroupModule],
  exports: [BetSingleListComponent],
  providers: [],
})
export class BetsSingleListModule {}
