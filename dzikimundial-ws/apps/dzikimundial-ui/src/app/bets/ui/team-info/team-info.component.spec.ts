import { ChangeDetectionStrategy } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { TeamInfoComponent } from './team-info.component'
import { TeamInfoModule } from './team-info.module'
import * as testTeamsData from './../../test/teams.test-data'
import { TeamName } from '../../models/bets-groups/bets-group.model'
import { By } from '@angular/platform-browser'

describe('TeamInfoComponent', () => {
  let fixture: ComponentFixture<TeamInfoComponent>
  let component: TeamInfoComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamInfoComponent],
      imports: [TeamInfoModule],
      providers: [],
    })
      .overrideComponent(TeamInfoComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    // given
    component.team = testTeamsData.findTeam(TeamName.AUSTRALIA)
    component.isReversed = false
    // when
    // then
    expect(component).toBeTruthy()
  })

  it('should display name of the team', () => {
    // given
    component.team = testTeamsData.findTeam(TeamName.BELGIUM)
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
    const team = testTeamsData.findTeam(TeamName.BELGIUM)
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
    const team = testTeamsData.findTeam(TeamName.BELGIUM)
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
