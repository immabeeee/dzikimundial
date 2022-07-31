import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AuthRestService } from '../../data-access/auth.rest.service'
import { AuthService } from '../../data-access/auth.service'
import { JwtService } from '../../data-access/jwt.service'
import { AuthInterceptorService } from '../../interceptor/auth-interceptor.service'
import { AuthShellRoutingModule } from './auth-shell-routing.module'

@NgModule({
  imports: [AuthShellRoutingModule, HttpClientModule],
  providers: [AuthInterceptorService, JwtService, AuthService, AuthRestService],
})
export class AuthShellModule {}
