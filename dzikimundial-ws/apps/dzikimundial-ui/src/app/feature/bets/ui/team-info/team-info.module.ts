import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiFlagModule } from '@dzikimundial-ws/ui-flag'
import { TeamInfoComponent } from './team-info.component'

@NgModule({
  declarations: [TeamInfoComponent],
  imports: [CommonModule, UiFlagModule],
  exports: [TeamInfoComponent],
  providers: [],
})
export class TeamInfoModule {}
