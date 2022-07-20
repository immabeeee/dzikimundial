import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link';
import { UiLogoModule } from '@dzikimundial-ws/ui-logo';
import { RouterModule } from '@angular/router';
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        UiNavLinkModule,
        UiLogoModule,
        RouterModule,
        UiIconButtonModule
    ],
    exports: [NavbarComponent],
})
export class NavbarModule { }
