import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { BetsGroupsService } from '../../data-access/bets-groups/bets-groups.service'
import { BetGroup } from '../../models/bets-groups/bets-group.model'

@Component({
  selector: 'dzikimundial-ws-bets-groups',
  templateUrl: './bets-groups.page.html',
  styleUrls: ['./bets-groups.page.scss'],
})
export class BetsBrowserGroupsComponent {
  groups$: Observable<BetGroup[]> = this.betsGroupsService.getGroups$()

  constructor(private betsGroupsService: BetsGroupsService) {
    this.betsGroupsService.fetchGroups()
  }
}
