import { Component } from '@angular/core'
import { ROUTER_LINK } from '../../models/route-links.model'
import { changeTheme, getCurrentTheme } from '@dzikimundial-ws/theme'
import { AuthService } from '@dzikimundial-ws/auth'
import { Observable } from 'rxjs'
import { User } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user$: Observable<User | undefined>
  public currentTheme: 'primary' | 'secondary'
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK

  constructor(private authService: AuthService) {
    this.currentTheme = getCurrentTheme()
    this.user$ = this.authService.loggedUser$
  }

  public handleLougout(): void {
    this.authService.logout()
  }

  public handleChangeTheme(): void {
    changeTheme()
    this.currentTheme = getCurrentTheme()
  }
}
