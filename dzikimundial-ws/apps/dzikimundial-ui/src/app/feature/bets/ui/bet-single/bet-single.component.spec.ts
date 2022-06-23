import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { ChangeDetectionStrategy } from '@angular/core'
import { BetSingleComponent } from './bet-single.component'
import { BetsSingleModule } from './bet-single.module'
import * as testSinglesData from '../../test/singles.test-data'
import { By } from '@angular/platform-browser'

let fixture: ComponentFixture<BetSingleComponent>
let component: BetSingleComponent

describe('BetSingleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetSingleComponent],
      imports: [BetsSingleModule],
    })
      .overrideComponent(BetSingleComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSingleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    // given
    // when
    // then
    expect(component).toBeTruthy()
  })

  it('should display date of the match', () => {
    // given
    const single = testSinglesData.singles[0]
    component.single = single
    fixture.detectChanges()

    const dateParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-single-date"]'),
    ).nativeElement

    // when

    // then
    expect(dateParagraph.textContent).toContain('11:00 AM')
  })

  it('should display info about home team', () => {
    // given
    const single = testSinglesData.singles[0]
    component.single = single
    fixture.detectChanges()

    const teamInfoContainer: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-team-info[data-test-id="bet-single-team-home-info"]'),
    ).nativeElement

    // when

    // then
    expect(teamInfoContainer).toBeTruthy()
  })

  it('should display info about away team', () => {
    // given
    const single = testSinglesData.singles[0]
    component.single = single
    fixture.detectChanges()

    const teamInfoContainer: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-team-info[data-test-id="bet-single-team-away-info"]'),
    ).nativeElement

    // when

    // then
    expect(teamInfoContainer).toBeTruthy()
  })

  it('should display input with team home goals', () => {
    // given
    const single = testSinglesData.singles[0]
    component.single = single
    fixture.detectChanges()

    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input[data-test-id="bet-single-team-home-goals"]'),
    ).nativeElement

    // when

    // then
    expect(input.value).toContain('')
  })

  it('should display input with team away goals', () => {
    // given
    const single = testSinglesData.singles[0]
    component.single = single
    fixture.detectChanges()

    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input[data-test-id="bet-single-team-away-goals"]'),
    ).nativeElement

    // when

    // then
    expect(input.value).toContain('')
  })
})
