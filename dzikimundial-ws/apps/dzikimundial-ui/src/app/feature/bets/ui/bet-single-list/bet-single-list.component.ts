import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BetSinglesGroupedByDate } from '../../models/bets-single/bets-single.model'

@Component({
  selector: 'dzikimundial-ws-bet-single-list',
  templateUrl: './bet-single-list.component.html',
  styleUrls: ['./bet-single-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetSingleListComponent {
  @Input() singlesGroupedByDate!: BetSinglesGroupedByDate[]
}
