import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { TeamFormService } from '../../data-access/team-form.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-create',
  templateUrl: './team-create.page.html',
  styleUrls: ['./team-create.page.scss'],
})
export class TeamCreatePageComponent implements OnInit {
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK
  public form!: FormGroup;

  get previewTeam(): Team{
    return this.form.getRawValue();
  }

  constructor(private teamFormService: TeamFormService){}

  ngOnInit(): void {
    this.form = this.teamFormService.createEmptyTeamForm();
  }
}
