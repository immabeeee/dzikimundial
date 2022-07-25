import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiProgressBarComponent } from './ui-progress-bar/ui-progress-bar.component'

@NgModule({
  imports: [CommonModule],
  declarations: [UiProgressBarComponent],
  exports: [UiProgressBarComponent],
})
export class UiProgressBarModule {}
