import { Component } from '@angular/core'
import { ROUTER_LINK } from '../../models/route-links.model'

@Component({
  selector: 'dzikimundial-ws-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK

  public handleLougout(): void {
    console.log('')
  }
}
