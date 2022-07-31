import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BetsGroupTeamsService } from '../../data-access/bets-groups/bets-group-teams.service'
import { BetGroup, BetGroupTeam } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-bet-group',
  templateUrl: './bet-group.component.html',
  styleUrls: ['./bet-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetsGroupComponent {
  @Input() group!: BetGroup

  constructor(private betsGroupTeamsService: BetsGroupTeamsService) {}

  public handleDropListItem(droppedItem: CdkDragDrop<BetGroupTeam[]>): void {
    this.group.teams = this.betsGroupTeamsService.changeTeamPosition(
      droppedItem.previousContainer.data,
      droppedItem.container.data,
      droppedItem.previousIndex,
      droppedItem.currentIndex,
    )
  }
}
