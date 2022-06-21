import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BetsGroupComponent } from './bet-group.component'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { BetsGroupTeamsService } from '../../data-access/bets-groups/bets-group-teams.service'
import { PipesSortArrayByKeyModule } from '@dzikimundial-ws/pipes/sort-array-by-key'
import { BetsGroupTeamModule } from '../bet-group-team/bet-group-team.module'
import { UiButtonModule } from '@dzikimundial-ws/ui-button'

@NgModule({
  declarations: [BetsGroupComponent],
  imports: [
    UiIconButtonModule, 
    CommonModule, 
    UiButtonModule,
    BetsGroupTeamModule, 
    DragDropModule, 
    PipesSortArrayByKeyModule, 
  ],
  exports: [BetsGroupComponent],
  providers: [BetsGroupTeamsService],
})
export class BetsGroupModule {}
