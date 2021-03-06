import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { AuthModule } from '@dzikimundial-ws/auth'
import { AuthGuard } from './guard/auth.guard'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpErrorInterceptor } from './core/interceptor/http-error.interceptor'
import { JwtInterceptor } from './core/interceptor/jwt.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot(), AuthModule],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },],
  bootstrap: [AppComponent],
})
export class AppModule {}
