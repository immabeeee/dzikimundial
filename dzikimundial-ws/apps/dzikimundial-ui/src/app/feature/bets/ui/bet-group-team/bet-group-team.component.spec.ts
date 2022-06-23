import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BetsGroupTeamModule } from './bet-group-team.module'
import { BetsGroupTeamComponent } from './bet-group-team.component'
import * as teamsTestData from '../../test/teams.test-data'
import { TeamName } from '../../models/bets-groups/bets-group.model'
import { ChangeDetectionStrategy } from '@angular/core'

let fixture: ComponentFixture<BetsGroupTeamComponent>
let component: BetsGroupTeamComponent

describe('BetsGroupTeamComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsGroupTeamComponent],
      imports: [BetsGroupTeamModule],
      providers: [],
    })
    .overrideComponent(BetsGroupTeamComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsGroupTeamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    // given
    // when
    // then
    expect(component).toBeTruthy()
  })

  it('should display position', () => {
    // given
    const team = teamsTestData.findTeam(TeamName.JAPAN)
    component.team = team
    fixture.detectChanges()
    const postionParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-group-team-position"]'),
    ).nativeElement

    // when

    // then
    expect(postionParagraph.textContent).toContain(team.position.toString())
  })

  it('should display flag', () => {
    // given
    const team = teamsTestData.findTeam(TeamName.JAPAN)
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

  it('should display name', () => {
    // given
    const team = teamsTestData.findTeam(TeamName.JAPAN)
    component.team = team
    fixture.detectChanges()
    const nameParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-group-team-name"]'),
    ).nativeElement

    // when

    // then
    expect(nameParagraph.textContent).toContain(team.name)
  })
})
