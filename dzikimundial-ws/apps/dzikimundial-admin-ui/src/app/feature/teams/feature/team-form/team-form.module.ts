import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TeamFormComponent } from './team-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'
import { UiInputModule } from '@dzikimundial-ws/ui-input'

@NgModule({
  declarations: [TeamFormComponent],
  imports: [CommonModule, ReactiveFormsModule, UiButtonModule, UiInputModule],
  exports: [TeamFormComponent],
  providers: [],
})
export class TeamFormModule {}
