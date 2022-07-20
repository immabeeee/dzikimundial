import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { BetGroup } from '@dzikimundial-ws/api-interfaces'
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
