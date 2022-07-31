import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { TeamItemModule } from './team-item.module'
import { TeamItemComponent } from './team-item.component'
import { RouterTestingModule } from '@angular/router/testing'
import { MockSelector, MockStore, provideMockStore } from '@ngrx/store/testing'
import { RemoveTeamsView, TeamsStateEntity } from '../../data-access/state/teams-state.models'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamName } from '@dzikimundial-ws/api-interfaces'
import { getRemoveTeamsView } from '../../data-access/state/teams-state.selectors'

let fixture: ComponentFixture<TeamItemComponent>
let component: TeamItemComponent
let mockStore: MockStore<TeamsStateEntity>

describe('BetsGroupTeamComponent', () => {
  afterEach(() => {
    mockStore?.resetSelectors()
  })

  it('should display provided team with hidden menu', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      { selector: getRemoveTeamsView, value: { removingTeams: [], removingTeamsError: [] } },
    ])
    component.team = teamsTestData.findTeam(TeamName.AUSTRALIA)
    component.hideMenu = true
    fixture.detectChanges()

    // when
    const teamParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-team-item-team-info"]'),
    ).nativeElement
    const menuContainer: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-team-item-menu-container"]'),
    )
    // then
    expect(component).toBeTruthy()
    expect(teamParagraph).toBeDefined()
    expect(menuContainer).toBe(null)
  })

  it('should display provided team with menu', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      { selector: getRemoveTeamsView, value: { removingTeams: [], removingTeamsError: [] } },
    ])
    component.team = teamsTestData.findTeam(TeamName.AUSTRALIA)
    component.hideMenu = false
    fixture.detectChanges()

    // when
    const teamParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-team-item-team-info"]'),
    ).nativeElement
    const menuContainer: DebugElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-team-item-menu-container"]'),
    ).nativeElement
    // then
    expect(component).toBeTruthy()
    expect(teamParagraph).toBeDefined()
    expect(menuContainer).toBeDefined()
  })

  it('should display menu with items', (done) => {
    // given
    configureTestingModuleWithProvidedSelector([
      { selector: getRemoveTeamsView, value: { removingTeams: [], removingTeamsError: [] } },
    ])
    component.team = teamsTestData.findTeam(TeamName.AUSTRALIA)
    component.hideMenu = false
    fixture.detectChanges()

    // when
    const menuContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-team-item-menu-container"]'),
    ).nativeElement

    const editButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-icon-button[data-test-id="dm-team-item-edit-button"]'),
    )?.nativeElement
    const removeButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-icon-button[data-test-id="dm-team-item-remove-button"]'),
    )?.nativeElement
    const playersButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-icon-button[data-test-id="dm-team-item-players-button"]'),
    )?.nativeElement
    const iconDebugElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('i[data-test-id="dm-icon-button-icon"]'),
    )
    const removeButtonIcon: HTMLElement = iconDebugElements[1].nativeElement
    // when

    // then
    expect(component).toBeTruthy()
    expect(menuContainer).toBeDefined()
    expect(editButton).toBeDefined()
    expect(removeButton).toBeDefined()
    expect(playersButton).toBeDefined()
    expect(iconDebugElements).toBeDefined()
    expect(iconDebugElements.length).toBe(3)
    expect(removeButtonIcon).toBeDefined()
    expect(removeButtonIcon.classList).toContain('gg-trash')

    mockStore.select(getRemoveTeamsView).subscribe((view: RemoveTeamsView) => {
      expect(view).toEqual({
        removingTeams: [],
        removingTeamsError: [],
      })
      done()
    })
  })

  it('should display loading item for remove button while item is removing', (done) => {
    // given
    configureTestingModuleWithProvidedSelector([
      { selector: getRemoveTeamsView, value: { removingTeams: [{ id: '1' }], removingTeamsError: [] } },
    ])
    component.team = { ...teamsTestData.findTeam(TeamName.AUSTRALIA), id: '1' }
    component.hideMenu = false
    fixture.detectChanges()

    // when
    const menuContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-team-item-menu-container"]'),
    ).nativeElement

    const editButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-icon-button[data-test-id="dm-team-item-edit-button"]'),
    )?.nativeElement
    const removeButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-icon-button[data-test-id="dm-team-item-remove-button"]'),
    )?.nativeElement
    const playersButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-icon-button[data-test-id="dm-team-item-players-button"]'),
    )?.nativeElement
    const iconDebugElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('i[data-test-id="dm-icon-button-icon"]'),
    )
    const iconLoadingDebugElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('i[data-test-id="dm-icon-button-loading-icon"]'),
    )
    const removeButtonLoadingIcon: HTMLElement = iconLoadingDebugElements[0].nativeElement

    // when

    // then
    expect(component).toBeTruthy()
    expect(menuContainer).toBeDefined()
    expect(editButton).toBeDefined()
    expect(removeButton).toBeDefined()
    expect(playersButton).toBeDefined()
    expect(iconDebugElements).toBeDefined()
    expect(iconDebugElements.length).toBe(2)
    expect(iconLoadingDebugElements).toBeDefined()
    expect(iconLoadingDebugElements.length).toBe(1)
    expect(removeButtonLoadingIcon).toBeDefined()
    expect(removeButtonLoadingIcon.classList).toContain('gg-spinner-two')

    mockStore.select(getRemoveTeamsView).subscribe((view: RemoveTeamsView) => {
      expect(view).toEqual({
        removingTeams: [{ id: '1' }],
        removingTeamsError: [],
      })
      done()
    })
  })
})

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [TeamItemComponent],
    imports: [TeamItemModule, RouterTestingModule],
    providers: [
      provideMockStore({
        selectors: selectors,
      }),
      TeamsStateFacade,
    ],
  })
    .overrideComponent(TeamItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents()

  mockStore = TestBed.inject(MockStore)
  fixture = TestBed.createComponent(TeamItemComponent)
  component = fixture.componentInstance
  fixture.detectChanges()
}
