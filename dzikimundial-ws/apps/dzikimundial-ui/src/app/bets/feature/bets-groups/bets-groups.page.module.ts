import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BetsGroupsService } from '../../data-access//bets-groups/bets-groups.service'
import { BetsGroupListModule } from '../../ui/bet-group-list/bet-group-list.module'
import { BetsGroupsPageRoutingModule } from './bets-groups-page-routing.module'
import { BetsBrowserGroupsComponent } from './bets-groups.page'

@NgModule({
  declarations: [BetsBrowserGroupsComponent],
  imports: [CommonModule, BetsGroupsPageRoutingModule, BetsGroupListModule],
  exports: [],
  providers: [BetsGroupsService],
})
export class BetsGroupsPageModule {}
