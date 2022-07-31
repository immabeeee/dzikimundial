import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'
import { MockSelector, MockStore, provideMockStore } from '@ngrx/store/testing'
import { TeamsStateEntity } from '../../data-access/state/teams-state.models'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { generateDefaultListQuery, TeamName } from '@dzikimundial-ws/api-interfaces'
import { getTeamListView } from '../../data-access/state/teams-state.selectors'
import { TeamListModule } from './team-list.module'
import { TeamListComponent } from './team-list.component'

let fixture: ComponentFixture<TeamListComponent>
let component: TeamListComponent
let mockStore: MockStore<TeamsStateEntity>

describe('TeamListComponent', () => {
  afterEach(() => {
    mockStore?.resetSelectors()
  })

  it('should display an empty team list', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamListView,
        value: {
          teams: [],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ])
    fixture.detectChanges()

    // when
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-error-message"]'),
    )?.nativeElement
    const emptyMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-empty-message"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-list-progress-bar"]'),
    )?.nativeElement
    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-admin-team-item[data-test-id="dm-team-list-item"]'),
    )

    // then
    expect(component).toBeTruthy()
    expect(errorMessage).toBe(undefined)
    expect(progressBar).toBe(undefined)
    expect(items).toEqual([])

    expect(emptyMessage).toBeDefined()
    expect(emptyMessage.textContent).toEqual('no content')
  })

  it('should display a progress bar', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamListView,
        value: {
          teams: null,
          isLoading: true,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ])
    fixture.detectChanges()

    // when
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-error-message"]'),
    )?.nativeElement
    const emptyMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-empty-message"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-list-progress-bar"]'),
    )?.nativeElement
    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-admin-team-item[data-test-id="dm-team-list-item"]'),
    )

    // then
    expect(component).toBeTruthy()
    expect(errorMessage).toBe(undefined)
    expect(emptyMessage).toBe(undefined)
    expect(items).toEqual([])

    expect(progressBar).toBeDefined()
  })

  it('should display an error message', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamListView,
        value: {
          teams: null,
          isLoading: false,
          error: 'error message',
          listQuery: generateDefaultListQuery(),
        },
      },
    ])
    fixture.detectChanges()

    // when
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-error-message"]'),
    )?.nativeElement
    const emptyMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-empty-message"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-list-progress-bar"]'),
    )?.nativeElement
    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-admin-team-item[data-test-id="dm-team-list-item"]'),
    )

    // then
    expect(component).toBeTruthy()
    expect(progressBar).toBe(undefined)
    expect(emptyMessage).toBe(undefined)
    expect(items).toEqual([])

    expect(errorMessage).toBeDefined()
    expect(errorMessage.textContent).toBe('error message')
  })

  it('should display a team list', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamListView,
        value: {
          teams: teamsTestData.teams,
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ])
    fixture.detectChanges()

    // when
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-error-message"]'),
    )?.nativeElement
    const emptyMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-list-empty-message"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-list-progress-bar"]'),
    )?.nativeElement
    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-admin-team-item[data-test-id="dm-team-list-item"]'),
    )

    // then
    expect(component).toBeTruthy()
    expect(progressBar).toBe(undefined)
    expect(emptyMessage).toBe(undefined)
    expect(errorMessage).toBe(undefined)

    expect(items).toBeDefined()
    expect(items.length).toBe(teamsTestData.teams.length)
  })
})

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [TeamListComponent],
    imports: [TeamListModule, RouterTestingModule],
    providers: [
      provideMockStore({
        selectors: selectors,
      }),
      TeamsStateFacade,
    ],
  })
    .overrideComponent(TeamListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents()

  mockStore = TestBed.inject(MockStore)
  fixture = TestBed.createComponent(TeamListComponent)
  component = fixture.componentInstance
  fixture.detectChanges()
}
