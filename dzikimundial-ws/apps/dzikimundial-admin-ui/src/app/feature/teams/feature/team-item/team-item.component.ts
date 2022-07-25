import { Component, Input } from '@angular/core'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { ROUTER_LINK } from './../../../../models/route-links.model'
import { map, Observable } from 'rxjs'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { RemoveTeamsView } from '../../data-access/state/teams-state.models'
import { TeamService } from '../../data-access/team.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.scss'],
})
export class TeamItemComponent {
  @Input() public team!: Team
  public removeTeamView$: Observable<RemoveTeamsView> = this.teamsStateFacade.removeTeamView$.pipe(
    map((view) => {
      return {
        removingTeams: view.removingTeams.filter((item) => item.id === this.team.id),
        removingTeamsError: view.removingTeamsError.filter((item) => item.id === this.team.id),
      }
    }),
  )

  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK

  constructor(private teamService: TeamService, private teamsStateFacade: TeamsStateFacade) {}

  public handleRemoveTeam(): void {
    const { id } = this.team

    if (!id) {
      return
    }

    this.teamService.removeTeam(id)
  }
}
