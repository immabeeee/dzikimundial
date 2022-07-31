import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamFormComponent } from './team-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'
import { UiInputModule } from '@dzikimundial-ws/ui-input'
import { TeamFormService } from '../../data-access/team-form.service'
import { UiValidationErrorModule } from '@dzikimundial-ws/ui-validation-error'

@NgModule({
  declarations: [TeamFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiButtonModule, UiInputModule, UiValidationErrorModule],
  exports: [TeamFormComponent],
  providers: [TeamFormService],
})
export class TeamFormModule {}
