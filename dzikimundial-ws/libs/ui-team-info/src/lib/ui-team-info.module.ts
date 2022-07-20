import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiTeamInfoComponent } from './team-info/team-info.component'
import { UiFlagModule } from '@dzikimundial-ws/ui-flag'

@NgModule({
  imports: [CommonModule, UiFlagModule],
  declarations: [UiTeamInfoComponent],
  exports: [UiTeamInfoComponent],
})
export class UiTeamInfoModule {}
