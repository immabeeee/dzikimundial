import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AppRemoteRoutingModule } from './app-remote-routing.module'
import { AppRemoteComponent } from './app-remote.component'
import { RelativeRouterService } from './services/relative-router.service'

@NgModule({
  declarations: [AppRemoteComponent],
  imports: [CommonModule, AppRemoteRoutingModule],
  exports: [],
  providers: [RelativeRouterService],
})
export class AppRemoteModule {}
