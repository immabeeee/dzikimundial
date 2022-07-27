import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BetSingleGroupComponent } from './bet-single-group.component'
import { BetsSingleGroupModule } from './bet-single-group.module'
import * as testData from '@dzikimundial-ws/test-utils'
import { By } from '@angular/platform-browser'

describe('BetSingleGroupComponent', () => {
  let fixture: ComponentFixture<BetSingleGroupComponent>
  let component: BetSingleGroupComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetSingleGroupComponent],
      imports: [BetsSingleGroupModule],
      providers: [],
    })
      .overrideComponent(BetSingleGroupComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSingleGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    // given
    const app = fixture.debugElement.componentInstance

    // when
    // then
    expect(app).toBeTruthy()
  })

  it('should display date of grouped singles', () => {
    // given
    component.groupedSingles = testData.singlesGroupedByDate[0]
    fixture.detectChanges()

    const dateParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-single-group-date"]'),
    ).nativeElement
    // when

    // then
    expect(dateParagraph.textContent).toContain('21/06/2022')
  })

  it('should display list of singles', () => {
    // given
    component.groupedSingles = testData.singlesGroupedByDate[0]
    fixture.detectChanges()

    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-bet-single[data-test-id="bet-single-item"]'),
    )
    const item: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-bet-single[data-test-id="bet-single-item"]'),
    ).nativeElement
    // when

    // then
    expect(items.length).toEqual(testData.singlesGroupedByDate[0].singles.length)
    expect(item).toBeTruthy()
  })
})
