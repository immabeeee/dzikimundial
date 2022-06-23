import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { BetsSingleModule } from '../bet-single/bet-single.module'
import { BetSingleGroupComponent } from './bet-single-group.component'

@NgModule({
  declarations: [BetSingleGroupComponent],
  imports: [UiIconButtonModule, CommonModule, BetsSingleModule],
  exports: [BetSingleGroupComponent],
  providers: [],
})
export class BetsSingleGroupModule {}
