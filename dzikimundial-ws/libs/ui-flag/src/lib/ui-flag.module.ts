import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { UiFlagComponent } from './ui-flag/ui-flag.component'

@NgModule({
  imports: [CommonModule],
  declarations: [
    UiFlagComponent
  ],
  exports: [UiFlagComponent]
})
export class UiFlagModule {}
