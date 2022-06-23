import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BetsSingleComponent } from './bets-single.page'
import { BetsSinglePageModule } from './bets-single.page.module'

describe('BetsSingleComponent', () => {
  let fixture: ComponentFixture<BetsSingleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsSingleComponent],
      imports: [BetsSinglePageModule],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsSingleComponent)
    fixture.detectChanges()
  })

  it('should create the component', () => {
    // given
    const app = fixture.debugElement.componentInstance

    // when
    // then
    expect(app).toBeTruthy()
  })
})
