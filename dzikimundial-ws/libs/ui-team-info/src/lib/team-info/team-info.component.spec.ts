import { ChangeDetectionStrategy } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import * as testData from '@dzikimundial-ws/test-utils';
import { By } from '@angular/platform-browser'
import { UiTeamInfoModule } from './../ui-team-info.module'
import { UiTeamInfoComponent } from './team-info.component'
import { TeamName } from '@dzikimundial-ws/api-interfaces'

describe('TeamInfoComponent', () => {
  let fixture: ComponentFixture<UiTeamInfoComponent>
  let component: UiTeamInfoComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiTeamInfoComponent],
      imports: [UiTeamInfoModule],
      providers: [],
    })
      .overrideComponent(UiTeamInfoComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTeamInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    // given
    component.team = testData.findTeam(TeamName.AUSTRALIA)
    component.isReversed = false
    // when
    // then
    expect(component).toBeTruthy()
  })

  it('should display name of the team', () => {
    // given
    component.team = testData.findTeam(TeamName.BELGIUM)
    fixture.detectChanges()

    const nameParagraph: HTMLInputElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-group-team-name"]'),
    ).nativeElement

    // when

    // then
    expect(nameParagraph.textContent).toContain(TeamName.BELGIUM)
  })

  it('should display flag of the team', () => {
    // given
    const team = testData.findTeam(TeamName.BELGIUM)
    component.team = team
    fixture.detectChanges()
    const flagImage: HTMLImageElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-flag[data-test-id="bet-group-team-flag"] > div > img'),
    ).nativeElement

    // when

    // then
    expect(flagImage.alt).toContain(team.description)
    expect(flagImage.src).toContain(team.logo)
  })

  it('should display name and flag of the team, when component is reversed', () => {
    // given
    const team = testData.findTeam(TeamName.BELGIUM)
    component.team = team
    component.isReversed = true
    fixture.detectChanges()

    const nameParagraph: HTMLInputElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-group-team-name"]'),
    ).nativeElement

    const flagImage: HTMLImageElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-flag[data-test-id="bet-group-team-flag"] > div > img'),
    ).nativeElement

    // when

    // then
    expect(nameParagraph.textContent).toContain(TeamName.BELGIUM)
    expect(flagImage.alt).toContain(team.description)
    expect(flagImage.src).toContain(team.logo)
  })
})
