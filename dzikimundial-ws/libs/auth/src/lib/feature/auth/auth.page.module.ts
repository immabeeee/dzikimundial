import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AuthPageRoutingModule } from './auth-page-routing.module'
import { AuthPageComponent } from './auth.page'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'
import { UiLogoModule } from '@dzikimundial-ws/ui-logo'
import { UiInputModule } from '@dzikimundial-ws/ui-input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthFormService } from '../../data-access/form/form/auth-form.service'

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, AuthPageRoutingModule, UiButtonModule, FormsModule, ReactiveFormsModule, UiLogoModule, UiInputModule],
  exports: [],
  providers: [AuthFormService],
})
export class AuthPageModule {}
