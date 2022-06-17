import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BetsGroupTeamModule } from './bet-group-team.module'
import { BetsGroupTeamComponent } from './bet-group-team.component'
import * as testData from './../../test/groups.test-data'

let fixture: ComponentFixture<BetsGroupTeamComponent>
let component: BetsGroupTeamComponent

describe('BetsGroupTeamComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsGroupTeamComponent],
      imports: [BetsGroupTeamModule],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsGroupTeamComponent)
    component = fixture.componentInstance
    component.team = {
      id: 'f47465b7-64f1-4c03-a610-62f6a860d341',
      description: 'Japonia',
      name: 'Japonia',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Japan_%28%E2%80%931870%29.svg/1920px-Flag_of_Japan_%28%E2%80%931870%29.svg.png',
      position: 2,
    }
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
    const team = testData.groups[0].teams[0]
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
    const team = testData.groups[0].teams[0]
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
    const team = testData.groups[0].teams[0]
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
