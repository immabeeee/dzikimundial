import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Team } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-ui-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTeamInfoComponent {
  @Input() team!: Team
  @Input() isReversed = false
}
