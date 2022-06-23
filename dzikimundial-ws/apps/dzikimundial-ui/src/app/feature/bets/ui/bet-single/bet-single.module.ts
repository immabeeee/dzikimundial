import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { BetsSingleFormService } from '../../data-access/bets-single/bets-single-form.service'
import { TeamInfoModule } from '../team-info/team-info.module'
import { BetSingleComponent } from './bet-single.component'
import { UiTooltipModule } from '@dzikimundial-ws/ui-tooltip'
import { BetSingleTranslatorService } from '../../data-access/bets-single/bets-single-translator.service'
import { BetsSingleService } from '../../data-access/bets-single/bets-single.service'

@NgModule({
  declarations: [BetSingleComponent],
  imports: [CommonModule, TeamInfoModule, ReactiveFormsModule, UiIconButtonModule, UiTooltipModule],
  exports: [BetSingleComponent],
  providers: [BetsSingleFormService, BetSingleTranslatorService, BetsSingleService],
})
export class BetsSingleModule {}
