import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RelativeRouterService, REMOTE_APP_PREFIX } from './remote/services/relative-router.service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    RelativeRouterService,
    {
      provide: REMOTE_APP_PREFIX,
      useValue: environment.appPrefix,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
