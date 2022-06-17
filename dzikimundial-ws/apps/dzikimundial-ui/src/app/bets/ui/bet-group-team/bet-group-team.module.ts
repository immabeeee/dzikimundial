import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UiFlagModule } from '@dzikimundial-ws/ui-flag'
import { BetsGroupTeamsService } from '../../data-access/bets-groups/bets-group-teams.service'
import { BetsGroupTeamComponent } from './bet-group-team.component'

@NgModule({
  declarations: [BetsGroupTeamComponent],
  imports: [CommonModule, UiFlagModule],
  exports: [BetsGroupTeamComponent],
  providers: [BetsGroupTeamsService],
})
export class BetsGroupTeamModule {}
