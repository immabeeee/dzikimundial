import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { Observable, Subscription, tap } from 'rxjs'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamView, UpdateTeamView } from '../../data-access/state/teams-state.models'
import { TeamFormService } from '../../data-access/team-form.service'
import { TeamService } from '../../data-access/team.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-edit',
  templateUrl: './team-edit.page.html',
  styleUrls: ['./team-edit.page.scss'],
})
export class TeamEditPageComponent {
  public routeParams$ = this.route.params.pipe(
    tap((params) => {
      this.teamId = params['id']
      this.getTeam(params['id'])
    }),
  )

  public teamView$: Observable<TeamView> = this.teamsStateFacade.team$.pipe(
    tap((view: TeamView) => view && view.team && this.fillTeamForm(view.team)),
  )

  public updateTeamView$: Observable<UpdateTeamView> = this.teamsStateFacade.updateTeamView$
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK
  public form!: FormGroup
  public teamId!: string

  get previewTeam(): Team {
    return this.form.getRawValue()
  }

  constructor(
    private teamFormService: TeamFormService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private teamsStateFacade: TeamsStateFacade,
  ) {
    this.form = this.teamFormService.createEmptyTeamForm()
  }

  public handleUpdateTeam(): void {
    if (this.form.invalid) {
      return
    }

    const req = this.form.getRawValue()
    this.teamService.updateTeam(this.teamId, {
      logo: req.logoUrlImage,
      description: req.description,
      name: req.name,
    })
  }

  private fillTeamForm(team: Team): void {
    this.teamFormService.fillTeamForm(this.form, team)
  }

  private getTeam(id: string): void {
    this.teamService.fetchTeam(id)
  }
}
