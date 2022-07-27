import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BetSingleListComponent } from './bet-single-list.component'
import { BetsSingleListModule } from './bet-single-list.module'
import * as testData from '@dzikimundial-ws/test-utils'
import { By } from '@angular/platform-browser'

describe('BetSingleListComponent', () => {
  let fixture: ComponentFixture<BetSingleListComponent>
  let component: BetSingleListComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetSingleListComponent],
      imports: [BetsSingleListModule],
      providers: [],
    })
      .overrideComponent(BetSingleListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSingleListComponent)
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

  it('should display single group items', () => {
    // given
    component.singlesGroupedByDate = testData.singlesGroupedByDate
    fixture.detectChanges()

    const items: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-bet-single-group[data-test-id="bet-single-group-list-item"]'),
    )
    const item: HTMLElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-bet-single-group[data-test-id="bet-single-group-list-item"]'),
    ).nativeElement

    // when

    // then
    expect(items.length).toEqual(testData.singlesGroupedByDate.length)
    expect(item).toBeTruthy()
  })
})
