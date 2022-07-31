import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamView, UpdateTeamView } from '../../data-access/state/teams-state.models'
import { TeamService } from '../../data-access/team.service'
import { TeamForm } from '../../models/remove-team.model'

@Component({
  selector: 'dzikimundial-ws-admin-team-edit',
  templateUrl: './team-edit.page.html',
  styleUrls: ['./team-edit.page.scss'],
})
export class TeamEditPageComponent {
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK

  public routeParams$ = this.route.params.pipe(
    tap((params) => {
      this.teamId = params['id']
    }),
    tap((params) => this.getTeam(params['id'])),
  )
  public teamView$: Observable<TeamView> = this.teamsStateFacade.team$
  public updateTeamView$: Observable<UpdateTeamView> = this.teamsStateFacade.updateTeamView$

  public form!: FormGroup
  public teamId!: string

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private teamsStateFacade: TeamsStateFacade,
  ) {}

  public handleSubmitResult(result: TeamForm): void {
    this.teamService.updateTeam(this.teamId, {
      logo: result.logoUrlImage,
      description: result.description,
      name: result.name,
    })
  }

  private getTeam(id: string): void {
    this.teamService.fetchTeam(id)
  }
}
