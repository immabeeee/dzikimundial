import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { BetSingle, UpdateBetSingleReq } from '../../models/bets-single/bets-single.model'
import { BetSingleTranslatorService } from './bets-single-translator.service'

@Injectable()
export class BetsSingleService {
  public singleBetsLoading$ = new BehaviorSubject<string[]>([])

  get singleBetsLoading() {
    return this.singleBetsLoading$.getValue()
  }

  constructor(private betSingleTranslatorService: BetSingleTranslatorService) {}

  public saveSingle(betSingle: BetSingle, homeGoals: number, awayGoals: number): void {
    this.toggleSingleBetLoading(betSingle.id)
    const req: UpdateBetSingleReq | undefined = this.betSingleTranslatorService.translateToUpdateBetSingleRequest(
      betSingle,
      homeGoals,
      awayGoals,
    )

    if (!req) {
      this.toggleSingleBetLoading(betSingle.id)
      return
    }

    setTimeout(() => {
      this.toggleSingleBetLoading(betSingle.id)
    }, 2000)
  }

  toggleSingleBetLoading(id: string): void {
    const isLoadingExsits: boolean = this.singleBetsLoading.includes(id)

    isLoadingExsits
      ? this.singleBetsLoading$.next(this.singleBetsLoading.filter((e) => e !== id))
      : this.singleBetsLoading$.next([...this.singleBetsLoading, id])
  }
}
