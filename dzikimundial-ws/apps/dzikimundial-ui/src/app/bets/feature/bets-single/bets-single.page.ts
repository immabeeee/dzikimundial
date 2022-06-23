import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { BetsSinglesService } from '../../data-access/bets-single/bets-singles.service'
import { BetSingle, BetSinglesGroupedByDate } from '../../models/bets-single/bets-single.model'

@Component({
  selector: 'dzikimundial-ws-bets-single',
  templateUrl: './bets-single.page.html',
  styleUrls: ['./bets-single.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetsSingleComponent implements OnInit {
  singlesGroupedByDate$!: Observable<BetSinglesGroupedByDate[]>

  constructor(private betsSinglesService: BetsSinglesService) {
    this.betsSinglesService.fetchSingles()
  }

  ngOnInit(): void {
    this.singlesGroupedByDate$ = this.betsSinglesService.groupSinglesByDate$()
  }
}
