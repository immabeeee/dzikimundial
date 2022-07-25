import { Component } from '@angular/core'
import { ROUTER_LINK } from '../../models/route-links.model'
import { changeTheme, getCurrentTheme } from '@dzikimundial-ws/theme'

@Component({
  selector: 'dzikimundial-ws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public currentTheme: 'primary' | 'secondary'
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK

  constructor() {
    this.currentTheme = getCurrentTheme()
  }

  public handleLougout(): void {
    console.log('')
  }

  public handleChangeTheme(): void {
    changeTheme()
    this.currentTheme = getCurrentTheme()
  }
}
