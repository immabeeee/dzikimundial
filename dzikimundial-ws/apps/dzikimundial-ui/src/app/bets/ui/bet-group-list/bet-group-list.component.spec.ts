import { DebugElement } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import * as testData from './../../test/groups.test-data'
import { BetGroupListComponent } from './bet-group-list.component'
import { BetsGroupListModule } from './bet-group-list.module'

let fixture: ComponentFixture<BetGroupListComponent>
let component: BetGroupListComponent

describe('BetGroupListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetGroupListComponent],
      imports: [BetsGroupListModule],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetGroupListComponent)
    component = fixture.componentInstance
    component.groups = testData.groups
    fixture.detectChanges()
  })

  it('should create the app', () => {
    // given
    // when
    // then
    expect(component).toBeTruthy()
  })

  it('should display every passed group', () => {
    // given
    const groupDivs: DebugElement[] = fixture.debugElement.queryAll(
      By.css('dzikimundial-ws-bet-group[data-test-id="bet-group-team-group"]'),
    )

    // when

    // then
    expect(groupDivs.length).toEqual(testData.groups.length)
  })
})
