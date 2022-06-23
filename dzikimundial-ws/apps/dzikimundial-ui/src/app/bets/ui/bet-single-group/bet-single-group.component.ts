import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BetSinglesGroupedByDate } from '../../models/bets-single/bets-single.model'

@Component({
  selector: 'dzikimundial-ws-bet-single-group',
  templateUrl: './bet-single-group.component.html',
  styleUrls: ['./bet-single-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetSingleGroupComponent {
  @Input() groupedSingles!: BetSinglesGroupedByDate
}