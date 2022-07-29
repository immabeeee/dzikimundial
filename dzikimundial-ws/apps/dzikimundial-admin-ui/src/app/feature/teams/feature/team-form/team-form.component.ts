import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Team } from '@dzikimundial-ws/api-interfaces'
import { TeamFormService } from '../../data-access/team-form.service'
import { TeamForm } from '../../models/remove-team.model'

@Component({
  selector: 'dzikimundial-ws-admin-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TeamFormComponent implements OnChanges {
  @Output() submitResult: EventEmitter<TeamForm> = new EventEmitter<TeamForm>()
  @Input() isLoading = false
  @Input() isDisabled = false
  @Input() isEditMode = false
  @Input() team?: Team | null

  public form!: FormGroup
  public readonly teamNameLabel = 'Team name'
  public readonly teamNamePlaceholder = 'eg. Poland'
  public readonly teamNameRequiredValidationMessage = 'Name is required'
  public readonly teamDescriptionLabel = 'Description'
  public readonly teamDescriptionPlaceholder = 'eg. Poland team'
  public readonly teamDescriptionRequiredValidationMessage = 'Description is required'
  public readonly teamLogoUrlLabel = 'Logo url'
  public readonly teamLogoUrlPlaceholder = 'eg. http://www.lorem.com/logo.png'
  public readonly teamLogoUrlRequiredValidationMessage = 'Logo is required'

  get submitButtonTitle(): string {
    return this.isEditMode ? 'Update' : 'Create'
  }

  get nameFormControl(): FormControl {
    return this.form.get('name') as FormControl
  }

  get descriptionFormControl(): FormControl {
    return this.form.get('description') as FormControl
  }

  get logoUrlImageFormControl(): FormControl {
    return this.form.get('logoUrlImage') as FormControl
  }

  constructor(private teamFormService: TeamFormService) {
    this.form = this.teamFormService.createEmptyTeamForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.team?.currentValue) {
      this.fillTeamForm(changes?.team?.currentValue)
    }
  }

  private fillTeamForm(team: Team): void {
    this.teamFormService.fillTeamForm(this.form, team)
  }

  public handleSubmit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    this.submitResult.emit(this.form.getRawValue())
  }
}
