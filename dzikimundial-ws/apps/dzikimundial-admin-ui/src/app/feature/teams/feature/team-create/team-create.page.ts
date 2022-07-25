import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { Observable, tap } from 'rxjs'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { CreateTeamView } from '../../data-access/state/teams-state.models'
import { TeamFormService } from '../../data-access/team-form.service'
import { TeamService } from '../../data-access/team.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-create',
  templateUrl: './team-create.page.html',
  styleUrls: ['./team-create.page.scss'],
})
export class TeamCreatePageComponent implements OnInit {
  public createTeamView$: Observable<CreateTeamView> = this.teamsStateFacade.createTeamView$

  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK
  public form!: FormGroup

  get previewTeam(): Team {
    return this.form.getRawValue()
  }

  constructor(
    private teamFormService: TeamFormService,
    private teamService: TeamService,
    private teamsStateFacade: TeamsStateFacade,
  ) {}

  ngOnInit(): void {
    this.form = this.teamFormService.createEmptyTeamForm()
  }

  public handleCreateTeam(): void {
    const req = this.form.getRawValue()
    this.teamService.createTeam({
      logo: req.logoUrlImage,
      description: req.description,
      name: req.name,
    })
  }
}
