import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MockSelector, MockStore, provideMockStore } from '@ngrx/store/testing'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { TeamsStateEntity } from '../../data-access/state/teams-state.models'
import { getCreateTeamView } from '../../data-access/state/teams-state.selectors'
import { TeamCreatePageComponent } from './team-create.page'
import { TeamCreatePageModule } from './team-create.page.module'
import { By } from '@angular/platform-browser'

describe('TeamCreatePageComponent', () => {
  let component: TeamCreatePageComponent
  let fixture: ComponentFixture<TeamCreatePageComponent>
  let mockStore: MockStore<TeamsStateEntity>

  afterEach(() => {
    mockStore?.resetSelectors()
  })

  it('should create', () => {
    configureTestingModuleWithProvidedSelector([
      {
        selector: getCreateTeamView,
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
        selector: getCreateTeamView,
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
      By.css('p[data-test-id="dm-team-create-section-title"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-create-progress-bar"]'),
    )?.nativeElement
    const form: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-form[data-test-id="dm-team-create-form"]'),
    )?.nativeElement

    // when

    // then
    expect(previousPageButton).toBeDefined()
    expect(sectionTitleParagraph).toBeDefined()
    expect(sectionTitleParagraph.textContent).toBe(`Create new team`)
    expect(progressBar).toBe(undefined)
    expect(form).toBeDefined()
  })

  it('should display progress bar while creating a team', () => {
    configureTestingModuleWithProvidedSelector([
      {
        selector: getCreateTeamView,
        value: {
          error: null,
          isLoading: true,
        },
      },
    ])
    fixture.detectChanges()

    // given
    const previousPageButton: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-single"]'),
    )?.nativeElement
    const sectionTitleParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-team-create-section-title"]'),
    )?.nativeElement
    const progressBar: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-progress-bar[data-test-id="dm-team-create-progress-bar"]'),
    )?.nativeElement
    const form: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-admin-team-form[data-test-id="dm-team-create-form"]'),
    )?.nativeElement

    // when

    // then
    expect(previousPageButton).toBeDefined()
    expect(sectionTitleParagraph).toBeDefined()
    expect(sectionTitleParagraph.textContent).toBe(`Create new team`)
    expect(progressBar).toBeDefined()
    expect(form).toBeDefined()
  })

  function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
    TestBed.configureTestingModule({
      declarations: [TeamCreatePageComponent],
      imports: [TeamCreatePageModule, RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: selectors,
        }),
        TeamsStateFacade,
      ],
    })
      .overrideComponent(TeamCreatePageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    mockStore = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(TeamCreatePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }
})
