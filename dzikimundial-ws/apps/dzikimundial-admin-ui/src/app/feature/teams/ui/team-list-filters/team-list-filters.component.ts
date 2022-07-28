import { Component, OnDestroy } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Filter, generateDefaultListQuery, ListQuery } from '@dzikimundial-ws/api-interfaces'
import { first } from 'lodash'
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  skipWhile,
  startWith,
  Subscription,
  take,
  tap,
} from 'rxjs'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamListView } from '../../data-access/state/teams-state.models'
import { TeamListFiltersFormService } from '../../data-access/team-list-filters-form.service'
import { TeamsService } from '../../data-access/teams.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-list-filters',
  templateUrl: './team-list-filters.component.html',
  styleUrls: ['./team-list-filters.component.scss'],
})
export class TeamListFiltersComponent implements OnDestroy {
  public formGroup: FormGroup
  public filters$!: Observable<Filter[]>
  public listQuery$: Observable<ListQuery | null> = this.teamsStateFacade.teamListView$.pipe(
    map((vm: TeamListView) => vm.listQuery),
  )
  private subscriptions: Subscription = new Subscription()

  constructor(
    private teamsStateFacade: TeamsStateFacade,
    private teamsService: TeamsService,
    private teamListFiltersFormService: TeamListFiltersFormService,
  ) {
    this.formGroup = this.teamListFiltersFormService.createEmptyForm()

    this.filters$ = combineLatest(
      this.formGroup.controls.name.valueChanges.pipe(
        startWith(this.formGroup.controls.name.value),
        debounceTime(500),
        distinctUntilChanged(),
      ),
      this.formGroup.controls.description.valueChanges.pipe(
        startWith(this.formGroup.controls.description.value),
        debounceTime(500),
        distinctUntilChanged(),
      ),
    ).pipe(
      map(([nameValue, descriptionValue]: [string, string]) =>
        [new Filter('name', nameValue), new Filter('description', descriptionValue)].filter((e) => e.value),
      ),
      tap((filters: Filter[]) => this.fetchTeams(filters)),
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  public fetchTeams(filters: Filter[]) {
    this.listQuery$
      .pipe(
        take(1),
        filter((listQuery) => JSON.stringify(listQuery?.filters) !== JSON.stringify(filters)),
        skipWhile(() => !filters || filters.length === 0),
        tap((listQuery: ListQuery | null) => {
          const newListQuery = listQuery ? listQuery : generateDefaultListQuery()
          this.teamsService.fetchTeams(newListQuery.updateFilters(filters))
        }),
      )
      .subscribe()
  }
}
