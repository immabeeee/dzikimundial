import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { BetGroup } from '../../models/bets-groups/bets-group.model'
import * as testData from '../../test/groups.test-data'

@Injectable()
export class BetsGroupsService {
  private groups$ = new BehaviorSubject<BetGroup[]>([])

  public getGroups$(): Observable<BetGroup[]> {
    return this.groups$
  }

  public fetchGroups(): void {
    this.groups$.next(testData.groups)
  }
}
