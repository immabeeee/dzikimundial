import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { CreateTeamView } from '../../data-access/state/teams-state.models'
import { TeamService } from '../../data-access/team.service'
import { TeamForm } from '../../models/remove-team.model'

@Component({
  selector: 'dzikimundial-ws-admin-team-create',
  templateUrl: './team-create.page.html',
  styleUrls: ['./team-create.page.scss'],
})
export class TeamCreatePageComponent {
  public createTeamView$: Observable<CreateTeamView> = this.teamsStateFacade.createTeamView$

  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK

  constructor(private teamService: TeamService, private teamsStateFacade: TeamsStateFacade) {}

  public handleSubmitResult(result: TeamForm): void {
    this.teamService.createTeam({
      logo: result.logoUrlImage,
      description: result.description,
      name: result.name,
    })
  }
}
