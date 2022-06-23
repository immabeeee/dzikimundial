import { Injectable } from '@angular/core'
import { isNullOrUndefined } from '../../../../utils/utils'
import { BetSingle, UpdateBetSingleReq } from '../../models/bets-single/bets-single.model'

@Injectable()
export class BetSingleTranslatorService {
  public translateToUpdateBetSingleRequest(
    betSingle: BetSingle,
    homeGoals: number,
    awayGoals: number,
  ): UpdateBetSingleReq | undefined {
    if (isNullOrUndefined(homeGoals) || isNullOrUndefined(awayGoals) || !betSingle) {
      // this.toastr.error('The bet could not be saved. Check that you have completed the form correctly', 'Ouups! 😥')
      return
    }

    const { id, date, homeTeam, awayTeam } = betSingle

    return {
      id,
      date,
      homeTeam,
      awayTeam,
      homeGoals,
      awayGoals,
    }
  }
}
