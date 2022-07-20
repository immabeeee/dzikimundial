import { Component } from '@angular/core'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { Observable } from 'rxjs'
import { TeamsService } from '../../data-access/teams.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
  public teams$: Observable<Team[]> = this.teamsService.getTeams$()

  constructor(private teamsService: TeamsService) {
    this.teamsService.fetchTeams()
  }
}
