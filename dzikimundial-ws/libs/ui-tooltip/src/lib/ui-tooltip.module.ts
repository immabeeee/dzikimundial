import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TooltipDirective } from './directives/tooltip.directive'
import { UiTooltipComponent } from './ui/ui-tooltip/ui-tooltip.component'

@NgModule({
  imports: [CommonModule],
  declarations: [UiTooltipComponent, TooltipDirective],
  exports: [TooltipDirective],
  providers: [],
})
export class UiTooltipModule {}
