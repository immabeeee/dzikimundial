import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthShellModule } from './feature/auth-shell/auth-shell.module'

@NgModule({
  imports: [CommonModule, AuthShellModule],
  providers: [],
})
export class AuthModule {}
