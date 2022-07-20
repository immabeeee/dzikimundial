import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BetGroup } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-bet-group-list',
  templateUrl: './bet-group-list.component.html',
  styleUrls: ['./bet-group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetGroupListComponent {
  @Input() groups!: BetGroup[]
}
