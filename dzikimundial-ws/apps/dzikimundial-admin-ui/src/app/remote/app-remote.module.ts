import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NavbarModule } from '../ui/navbar/navbar.module'
import { AppRemoteRoutingModule } from './app-remote-routing.module'
import { AppRemoteComponent } from './app-remote.component'
import { RelativeRouterService } from './services/relative-router.service'
import { UiTooltipModule } from '@dzikimundial-ws/ui-tooltip'

@NgModule({
  declarations: [AppRemoteComponent],
  imports: [CommonModule, AppRemoteRoutingModule, NavbarModule, UiTooltipModule],
  exports: [],
  providers: [RelativeRouterService],
})
export class AppRemoteModule {}
