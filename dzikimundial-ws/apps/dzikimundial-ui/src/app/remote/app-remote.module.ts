import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AppRemoteRoutingModule } from './app-remote-routing.module'
import { AppRemoteComponent } from './app-remote.component'
import { RelativeRouterService } from './services/relative-router.service'
import { NavbarModule } from './../ui/navbar/navbar.module'
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [AppRemoteComponent],
  imports: [CommonModule, AppRemoteRoutingModule, NavbarModule, ToastrModule.forRoot()],
  exports: [],
  providers: [RelativeRouterService],
})
export class AppRemoteModule {}
