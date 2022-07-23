import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamListView } from '../../data-access/state/teams-state.models'
import { TeamsService } from '../../data-access/teams.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
  public teamsView$: Observable<TeamListView> = this.teamsStateFacade.teamListView$;

  constructor(private teamsService: TeamsService, private teamsStateFacade: TeamsStateFacade) {
    this.teamsService.fetchTeams(0, 1000)
  }
}
