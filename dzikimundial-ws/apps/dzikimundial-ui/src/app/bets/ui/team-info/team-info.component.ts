import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BetGroupTeam } from '../../models/bets-groups/bets-group.model'

@Component({
  selector: 'dzikimundial-ws-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamInfoComponent {
  @Input() team!: BetGroupTeam
  @Input() isReversed = false
}
