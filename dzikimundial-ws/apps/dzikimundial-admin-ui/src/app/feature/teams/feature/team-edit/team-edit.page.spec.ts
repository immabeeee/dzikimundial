import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MockSelector, MockStore, provideMockStore } from '@ngrx/store/testing'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamsStateEntity } from '../../data-access/state/teams-state.models'
import { getTeamView, getUpdateTeamView } from '../../data-access/state/teams-state.selectors'
import { TeamEditPageComponent } from './team-edit.page'
import { TeamEditPageModule } from './team-edit.page.module'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { TeamName } from '@dzikimundial-ws/api-interfaces'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'

describe('TeamEditPageComponent', () => {
  let component: TeamEditPageComponent
  let fixture: ComponentFixture<TeamEditPageComponent>
  let mockStore: MockStore<TeamsStateEntity>

  afterEach(() => {
    mockStore?.resetSelectors()
  })

  it('should create', () => {
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamView,
        value: {
          team: teamsTestData.findTeam(TeamName.ARGENTINA),
          error: null,
          isLoading: false,
        },
      },
      {
        selector: getUpdateTeamView,
        value: {
          error: null,
          isLoading: false,
        },
      },
    ])
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should display team edit page', () => {
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamView,
        value: {
          team: teamsTestData.findTeam(TeamName.ARGENTINA),
          error: null,
          isLoading: false,
        },
      },
      {
        selector: getUpdateTeamView,
        value: {
          error: null,
          isLoading: false,
        },
      },
    ])
    fixture.detectChanges()

    // given
    const previousPageButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-single"]'),
    )?.nativeElement
    const sectionTitleParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-team-edit-section-title"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-edit-progress-bar"]'),
    )?.nativeElement
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-edit-error"]'),
    )?.nativeElement
    const form: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-form[data-test-id="dm-team-edit-form"]'),
    )?.nativeElement

    // when

    // then
    expect(previousPageButton).toBeDefined()
    expect(sectionTitleParagraph).toBeDefined()
    expect(sectionTitleParagraph.textContent).toBe(`Edit team: ${TeamName.ARGENTINA}`)
    expect(progressBar).toBe(undefined)
    expect(errorMessage).toBe(undefined)
    expect(form).toBeDefined()
  })

  it('should display progress bar while team details are loading', () => {
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamView,
        value: {
          team: null,
          error: null,
          isLoading: true,
        },
      },
      {
        selector: getUpdateTeamView,
        value: {
          error: null,
          isLoading: false,
        },
      },
    ])
    fixture.detectChanges()

    // given
    const previousPageButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-single"]'),
    )?.nativeElement
    const sectionTitleParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-team-edit-section-title"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-edit-progress-bar"]'),
    )?.nativeElement
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-edit-error"]'),
    )?.nativeElement
    const form: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-form[data-test-id="dm-team-edit-form"]'),
    )?.nativeElement

    // when

    // then
    expect(previousPageButton).toBeDefined()
    expect(sectionTitleParagraph).toBeDefined()
    expect(sectionTitleParagraph.textContent).toBe(`Edit team`)
    expect(progressBar).toBeDefined()
    expect(form).toBe(undefined)
    expect(errorMessage).toBe(undefined)
  })

  it('should display error message while loading team details failed', () => {
    configureTestingModuleWithProvidedSelector([
      {
        selector: getTeamView,
        value: {
          team: null,
          error: 'Cant find team with provided id',
          isLoading: false,
        },
      },
      {
        selector: getUpdateTeamView,
        value: {
          error: null,
          isLoading: false,
        },
      },
    ])
    fixture.detectChanges()

    // given
    const previousPageButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-single"]'),
    )?.nativeElement
    const sectionTitleParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-team-edit-section-title"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-edit-progress-bar"]'),
    )?.nativeElement
    const errorMessage: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-message[data-test-id="dm-team-edit-error"]'),
    )?.nativeElement
    const form: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-form[data-test-id="dm-team-edit-form"]'),
    )?.nativeElement

    // when

    // then
    expect(previousPageButton).toBeDefined()
    expect(sectionTitleParagraph).toBeDefined()
    expect(sectionTitleParagraph.textContent).toBe(`Edit team`)
    expect(progressBar).toBe(undefined)
    expect(form).toBe(undefined)
    expect(errorMessage).toBeDefined()
    expect(errorMessage.textContent).toBe('Cant find team with provided id')
  })

  function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
    TestBed.configureTestingModule({
      declarations: [TeamEditPageComponent],
      imports: [TeamEditPageModule, RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: selectors,
        }),
        TeamsStateFacade,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 'test-uuid',
            }),
            snapshot: {},
          },
        },
      ],
    })
      .overrideComponent(TeamEditPageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    mockStore = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(TeamEditPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }
})
