import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiMessageComponent } from './ui-message/ui-message.component'

@NgModule({
  imports: [CommonModule],
  declarations: [UiMessageComponent],
  exports: [UiMessageComponent],
})
export class UiMessageModule {}
