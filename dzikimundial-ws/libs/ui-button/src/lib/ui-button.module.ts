import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiButtonComponent } from './ui-button/ui-button.component'

@NgModule({
  imports: [CommonModule],
  declarations: [UiButtonComponent],
  exports: [UiButtonComponent],
})
export class UiButtonModule {}
