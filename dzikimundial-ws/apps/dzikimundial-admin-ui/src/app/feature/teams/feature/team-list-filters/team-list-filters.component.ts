import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Filter, ListQuery } from '@dzikimundial-ws/api-interfaces'
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamListView } from '../../data-access/state/teams-state.models'
import { TeamsService } from '../../data-access/teams.service'

@Component({
  selector: 'dzikimundial-ws-admin-team-list-filters',
  templateUrl: './team-list-filters.component.html',
  styleUrls: ['./team-list-filters.component.scss'],
})
export class TeamListFiltersComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup
  public listQuery!: ListQuery

  private subscriptions: Subscription = new Subscription()

  constructor(
    private formBuilder: FormBuilder,
    private teamsStateFacade: TeamsStateFacade,
    private teamsService: TeamsService,
  ) {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control({ value: null }),
      description: this.formBuilder.control({ value: null }, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.teamsStateFacade.teamListView$.subscribe((teamListView: TeamListView) => {
        if (teamListView && teamListView.listQuery) {
          this.listQuery = teamListView.listQuery
        }
      }),
    )

    this.subscriptions.add(
      this.formGroup.controls.name.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
        const listQuery = this.listQuery.updateFilter(new Filter('name', value))
        this.teamsService.fetchTeams(listQuery)
      }),
    )

    this.subscriptions.add(
      this.formGroup.controls.description.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
        const listQuery = this.listQuery.updateFilter(new Filter('description', value))
        this.teamsService.fetchTeams(listQuery)
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
