import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiLogoComponent } from './ui-logo/ui-logo.component'

@NgModule({
  imports: [CommonModule],
  declarations: [UiLogoComponent],
  exports: [UiLogoComponent],
})
export class UiLogoModule {}
