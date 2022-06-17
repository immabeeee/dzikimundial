import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { UiNavLinkComponent } from './ui-nav-link/ui-nav-link.component'
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    UiNavLinkComponent,
  ],
  exports: [UiNavLinkComponent]
})
export class UiNavLinkModule {}
