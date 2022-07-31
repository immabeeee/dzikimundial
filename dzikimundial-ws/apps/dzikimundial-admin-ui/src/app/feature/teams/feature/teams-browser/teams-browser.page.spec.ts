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
import { getRemoveTeamsView, getTeamListView } from '../../data-access/state/teams-state.selectors'
import { TeamsBrowserPageModule } from './teams-browser.page.module'
import { TeamsBrowserPageComponent } from './teams-browser.page'

let fixture: ComponentFixture<TeamsBrowserPageComponent>
let component: TeamsBrowserPageComponent
let mockStore: MockStore<TeamsStateEntity>

describe('TeamsBrowserPageComponent', () => {
  afterEach(() => {
    mockStore?.resetSelectors()
  })

  it('should teams browser page', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamListView,
        value: {
          teams: teamsTestData.teams.map((e, index) => (e.id = index.toString())),
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
      { selector: getRemoveTeamsView, value: { removingTeams: [{ id: '1' }, { id: '4' }], removingTeamsError: [] } },
    ])
    fixture.detectChanges()

    // when
    const filters: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-list-filters[data-test-id="dm-teams-browser-filters"]'),
    )?.nativeElement
    const navLink: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-create-team"]'),
    )?.nativeElement
    const teamList: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-list[data-test-id="dm-teams-browser-team-list"]'),
    )?.nativeElement

    // then
    expect(component).toBeTruthy()
    expect(filters).toBeDefined()
    expect(navLink).toBeDefined()
    expect(teamList).toBeDefined()
  })
})

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [TeamsBrowserPageComponent],
    imports: [TeamsBrowserPageModule, RouterTestingModule],
    providers: [
      provideMockStore({
        selectors: selectors,
      }),
      TeamsStateFacade,
    ],
  })
    .overrideComponent(TeamsBrowserPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents()

  mockStore = TestBed.inject(MockStore)
  fixture = TestBed.createComponent(TeamsBrowserPageComponent)
  component = fixture.componentInstance
  fixture.detectChanges()
}
