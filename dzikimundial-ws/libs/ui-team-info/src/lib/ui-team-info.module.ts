import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiTeamInfoComponent } from './team-info/team-info.component'
import { UiFlagModule } from '@dzikimundial-ws/ui-flag'
import { UiTooltipModule } from '@dzikimundial-ws/ui-tooltip'

@NgModule({
  imports: [CommonModule, UiFlagModule, UiTooltipModule],
  declarations: [UiTeamInfoComponent],
  exports: [UiTeamInfoComponent],
})
export class UiTeamInfoModule {}
