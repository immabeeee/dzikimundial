import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { TeamFormService } from '../../data-access/team-form.service'
import { TeamForm } from '../../models/remove-team.model'

@Component({
  selector: 'dzikimundial-ws-admin-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamFormComponent implements OnChanges {
  @Output() submitResult: EventEmitter<TeamForm> = new EventEmitter<TeamForm>()
  @Input() isLoading = false
  @Input() isLoadingFormValue = false
  @Input() isDisabled = false
  @Input() isEditMode = false
  @Input() team?: Team | null

  public form!: FormGroup

  get submitButtonTitle(): string {
    return this.isEditMode ? 'Update' : 'Create'
  }

  constructor(private teamFormService: TeamFormService) {
    this.form = this.teamFormService.createEmptyTeamForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.team?.currentValue) {
      console.log("changes?.team?.currentValue: ", changes?.team?.currentValue)
      this.fillTeamForm(changes?.team?.currentValue)
    }
  }

  private fillTeamForm(team: Team): void {
    this.teamFormService.fillTeamForm(this.form, team)
  }

  public handleSubmit(): void {
    this.form.markAsTouched()
    if (this.form.invalid) return

    console.log("this.form: ", this.form)

    this.submitResult.emit(this.form.getRawValue())
  }
}
