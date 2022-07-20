import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { AuthModule } from '@dzikimundial-ws/auth'
import { AuthGuard } from './guard/auth.guard'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot(), AuthModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
