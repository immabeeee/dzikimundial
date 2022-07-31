import { Injectable } from '@angular/core'
import { BehaviorSubject, from, GroupedObservable, Observable } from 'rxjs'
import { BetSingle, BetSinglesGroupedByDate, UpdateBetSingleReq } from '../../models/bets-single/bets-single.model'
import * as testData from '@dzikimundial-ws/test-utils'
import { groupBy, mergeMap, map, toArray, reduce } from 'rxjs/operators'
import * as moment from 'moment'

@Injectable()
export class BetsSinglesService {
  private singles$ = new BehaviorSubject<BetSingle[]>([])

  public getSingles$(): Observable<BetSingle[]> {
    return this.singles$
  }

  public groupSinglesByDate$(): Observable<BetSinglesGroupedByDate[]> {
    return from(this.singles$.getValue()).pipe(
      groupBy((betSingle: BetSingle) => moment(betSingle.date).format('DD/MM/YYYY')),
      mergeMap((singlesGroup$: GroupedObservable<string, BetSingle>) =>
        singlesGroup$.pipe(
          reduce((acc: (string | BetSingle)[], cur: BetSingle) => [...acc, cur], [`${singlesGroup$.key}`]),
        ),
      ),
      map((groupedSingles: (string | BetSingle)[]) => {
        const betSingles: BetSingle[] = groupedSingles.filter((groupedSingle) =>
          this.isBetSingle(groupedSingle),
        ) as BetSingle[]
        return { date: groupedSingles[0] as string, singles: betSingles }
      }),
      toArray(),
    )
  }

  public fetchSingles(): void {
    this.singles$.next(testData.singles)
  }

  private isBetSingle(betSingle: BetSingle | string): betSingle is BetSingle {
    return (<BetSingle>betSingle).id !== undefined
  }
}
