import { Component, Input } from '@angular/core'
import { Team } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-admin-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss'],
})
export class TeamItemComponent {
  @Input() public team!: Team
}
