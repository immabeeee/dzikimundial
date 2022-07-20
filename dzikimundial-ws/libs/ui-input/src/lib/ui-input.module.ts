import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { UiInputComponent } from './ui-input/ui-input.component'
import { FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    UiInputComponent
  ],
  providers: [RequiredValidator],
  exports: [UiInputComponent]
})
export class UiInputModule {}
