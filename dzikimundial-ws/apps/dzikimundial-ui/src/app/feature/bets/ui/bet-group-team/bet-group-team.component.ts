import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BetGroupTeam } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-bet-group-team',
  templateUrl: './bet-group-team.component.html',
  styleUrls: ['./bet-group-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetsGroupTeamComponent {
  @Input() team!: BetGroupTeam
}
