import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BetGroupListComponent } from './bet-group-list.component'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { BetsGroupModule } from '../bet-group/bet-group.module'

@NgModule({
  declarations: [BetGroupListComponent],
  imports: [UiIconButtonModule, CommonModule, BetsGroupModule],
  exports: [BetGroupListComponent],
  providers: [],
})
export class BetsGroupListModule {}
