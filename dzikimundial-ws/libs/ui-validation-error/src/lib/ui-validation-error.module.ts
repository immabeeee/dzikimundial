import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiValidationErrorComponent } from './ui-validation-error/ui-validation-error.component'

@NgModule({
  imports: [CommonModule],
  declarations: [UiValidationErrorComponent],
  exports: [UiValidationErrorComponent],
})
export class UiValidationErrorModule {}
