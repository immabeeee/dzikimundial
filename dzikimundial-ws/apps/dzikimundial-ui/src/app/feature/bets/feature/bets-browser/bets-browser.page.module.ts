import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BetsBrowserPageRoutingModule } from './bets-browser-page-routing.module';
import { BetsBrowserPageComponent } from './bets-browser.page';
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link';

@NgModule({
    declarations: [
        BetsBrowserPageComponent
    ],
    imports: [
        CommonModule,
        BetsBrowserPageRoutingModule,
        UiNavLinkModule
    ],
    exports: [],
    providers: []
})
export class BetsBrowserPageModule { }
