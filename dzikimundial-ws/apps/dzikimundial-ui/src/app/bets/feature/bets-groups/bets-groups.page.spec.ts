import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BetsGroupsPageRoutingModule } from './bets-groups-page-routing.module'
import { BetsBrowserGroupsComponent } from './bets-groups.page'
import { BetsGroupsPageModule } from './bets-groups.page.module'

let fixture: ComponentFixture<BetsBrowserGroupsComponent>

describe('BetsBrowserGroupsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsBrowserGroupsComponent],
      imports: [BetsGroupsPageRoutingModule, BetsGroupsPageModule],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsBrowserGroupsComponent)
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
