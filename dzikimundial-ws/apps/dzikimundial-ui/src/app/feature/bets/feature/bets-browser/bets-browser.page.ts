import { Component } from '@angular/core';
import { BETS_ROUTER_LINK } from '../../models/route-links.model';

@Component({
  selector: 'dzikimundial-ws-bets-browser',
  templateUrl: './bets-browser.page.html',
  styleUrls: ['./bets-browser.page.scss']
})
export class BetsBrowserPageComponent {
    public readonly ROUTER_LINK: typeof BETS_ROUTER_LINK = BETS_ROUTER_LINK;
}
