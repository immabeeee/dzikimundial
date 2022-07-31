import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AuthModule } from '@dzikimundial-ws/auth'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthGuard } from './guard/auth.guard'
import { RelativeRouterService, REMOTE_APP_PREFIX } from './remote/services/relative-router.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpErrorInterceptor } from './core/interceptor/http-error.interceptor'
import { JwtInterceptor } from './core/interceptor/jwt.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [
    RelativeRouterService,
    {
      provide: REMOTE_APP_PREFIX,
      useValue: environment.appPrefix,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
