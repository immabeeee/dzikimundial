import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { BETS_ROUTER_LINK } from '../../models/route-links.model'
import { BetsBrowserPageComponent } from './bets-browser.page'
import { Location } from '@angular/common'
import { UiNavLinkModule } from '@dzikimundial-ws/ui-nav-link'

let fixture: ComponentFixture<BetsBrowserPageComponent>
let router: Router
let location: Location

describe('BetsBrowserPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetsBrowserPageComponent],
      imports: [
        UiNavLinkModule,
        RouterTestingModule.withRoutes([
          { path: BETS_ROUTER_LINK.GROUPS, component: BetsBrowserPageComponent },
          { path: BETS_ROUTER_LINK.SINGLE, component: BetsBrowserPageComponent },
          { path: BETS_ROUTER_LINK.WINNERS, component: BetsBrowserPageComponent },
          { path: BETS_ROUTER_LINK.BEST, component: BetsBrowserPageComponent },
        ]),
      ],
      providers: [],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsBrowserPageComponent)
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    router.initialNavigation()
    fixture.detectChanges()
  })

  it('should create the app', () => {
    // given
    const app = fixture.debugElement.componentInstance

    // when
    // then
    expect(app).toBeTruthy()
  })

  it('should display nav links with type of bet', () => {
    // given
    const item1: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-groups"] > a'),
    ).nativeElement
    const item2: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-single"] > a'),
    ).nativeElement
    const item3: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-winners"] > a'),
    ).nativeElement
    const item4: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-best"] > a'),
    ).nativeElement

    // when
    fixture.detectChanges()

    // then
    expect(item1).toBeTruthy()
    expect(item1.textContent).toBe('groups')

    expect(item2).toBeTruthy()
    expect(item2.textContent).toBe('single')

    expect(item3).toBeTruthy()
    expect(item3.textContent).toBe('winners')

    expect(item4).toBeTruthy()
    expect(item4.textContent).toBe('best')
  })

  it('should navigate to "groups" betting page', () => {
    // given
    const item = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-groups"] > a'),
    ).nativeElement

    // when
    item.click()
    fixture.detectChanges()

    // then
    expect(location.path()).toBe('/groups')
  })

  it('should navigate to "single" betting page', () => {
    // given
    const item = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-single"] > a'),
    ).nativeElement

    // when
    item.click()
    fixture.detectChanges()

    // then
    expect(location.path()).toBe('/single')
  })

  it('should navigate to "winners" betting page', () => {
    // given
    const item = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-winners"] > a'),
    ).nativeElement

    // when
    item.click()
    fixture.detectChanges()

    // then
    expect(location.path()).toBe('/winners')
  })

  it('should navigate to "best" betting page', () => {
    // given
    const item = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-best"] > a'),
    ).nativeElement

    // when
    item.click()
    fixture.detectChanges()

    // then
    expect(location.path()).toBe('/best')
  })
})
