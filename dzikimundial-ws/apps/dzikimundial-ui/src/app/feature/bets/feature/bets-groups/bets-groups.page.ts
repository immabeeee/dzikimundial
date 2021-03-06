import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { BetsGroupsService } from '../../data-access/bets-groups/bets-groups.service'
import { BetGroup } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-bets-groups',
  templateUrl: './bets-groups.page.html',
  styleUrls: ['./bets-groups.page.scss'],
})
export class BetsGroupsComponent {
  groups$: Observable<BetGroup[]> = this.betsGroupsService.getGroups$()

  constructor(private betsGroupsService: BetsGroupsService) {
    this.betsGroupsService.fetchGroups()
  }
}
