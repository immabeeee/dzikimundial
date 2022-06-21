import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BetsGroupsPageRoutingModule } from './bets-groups-page-routing.module'
import { BetsGroupsComponent } from './bets-groups.page'
import { BetsGroupsPageModule } from './bets-groups.page.module'

let fixture: ComponentFixture<BetsGroupsComponent>

describe('BetsGroupsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsGroupsComponent],
      imports: [BetsGroupsPageRoutingModule, BetsGroupsPageModule],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsGroupsComponent)
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
