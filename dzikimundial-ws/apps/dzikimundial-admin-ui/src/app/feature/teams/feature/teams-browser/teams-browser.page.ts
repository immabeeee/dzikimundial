import { Component } from '@angular/core'
import { ROUTER_LINK } from './../../../../models/route-links.model'

@Component({
  selector: 'dzikimundial-ws-admin-teams-browser',
  templateUrl: './teams-browser.page.html',
  styleUrls: ['./teams-browser.page.scss'],
})
export class TeamsBrowserPageComponent {
  public readonly ROUTER_LINK: typeof ROUTER_LINK = ROUTER_LINK
}
