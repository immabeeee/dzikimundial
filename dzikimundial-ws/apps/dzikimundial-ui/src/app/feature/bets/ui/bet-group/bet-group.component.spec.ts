import { DebugElement } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import * as testData from '@dzikimundial-ws/test-utils'
import { BetsGroupComponent } from './bet-group.component'
import { BetsGroupModule } from './bet-group.module'

let fixture: ComponentFixture<BetsGroupComponent>
let component: BetsGroupComponent

describe('BetsGroupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsGroupComponent],
      imports: [BetsGroupModule],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsGroupComponent)
    component = fixture.componentInstance
    component.group = testData.groups[0]
    fixture.detectChanges()
  })

  it('should create the app', () => {
    // given
    // when
    // then
    expect(component).toBeTruthy()
  })

  it('should display name', () => {
    // given
    const groupNameParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="bet-group-team-group-name"]'),
    ).nativeElement

    // when

    // then
    expect(groupNameParagraph.textContent).toContain(testData.groups[0].name)
  })
})
