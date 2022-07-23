import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NavbarModule } from '../ui/navbar/navbar.module'
import { AppRemoteRoutingModule } from './app-remote-routing.module'
import { AppRemoteComponent } from './app-remote.component'
import { RelativeRouterService } from './services/relative-router.service'
import { UiTooltipModule } from '@dzikimundial-ws/ui-tooltip'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../../environments/environment'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from '../core/interceptor/jwt.interceptor'
import { HttpErrorInterceptor } from '../core/interceptor/http-error.interceptor'

@NgModule({
  declarations: [AppRemoteComponent],
  imports: [CommonModule, AppRemoteRoutingModule, NavbarModule, UiTooltipModule, 
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    RelativeRouterService, 
  ],
})
export class AppRemoteModule {}
