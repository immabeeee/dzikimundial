import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { NavbarComponent } from './navbar.component'
import { NavbarModule } from './navbar.module'

describe('NavbarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [NavbarModule, RouterTestingModule.withRoutes([])],
      providers: [],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NavbarComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it('should display application logo', () => {
    const fixture = TestBed.createComponent(NavbarComponent)
    const logo = fixture.debugElement.query(By.css('dzikimundial-ws-ui-logo[data-test-id="nav-logo"] > div > p'))
    expect(logo).toBeTruthy()
    expect(logo.nativeElement.textContent).toBe(' dzikimundial ')
  })

  it('should display navigation menu', () => {
    const fixture = TestBed.createComponent(NavbarComponent)
    const ul = fixture.debugElement.query(By.css('ul[data-test-id="nav-menu-list"]'))
    expect(ul).toBeTruthy()
  })

  it('should display navigation menu items', () => {
    const fixture = TestBed.createComponent(NavbarComponent)
    const ul = fixture.debugElement.queryAll(By.css('li'))
    const item1: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-bets"] > a'),
    ).nativeElement
    const item2: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-scores"] > a'),
    ).nativeElement
    const item3: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-prizes"] > a'),
    ).nativeElement
    const item4: HTMLAnchorElement = fixture.debugElement.query(
      By.css('dzikimundial-ws-ui-nav-link[data-test-id="nav-link-settings"] > a'),
    ).nativeElement

    fixture.detectChanges()

    expect(ul).toBeTruthy()
    expect(ul.length).toBe(4)

    expect(item1).toBeTruthy()
    expect(item1.textContent).toBe('bets')

    expect(item2).toBeTruthy()
    expect(item2.textContent).toBe('scores')

    expect(item3).toBeTruthy()
    expect(item3.textContent).toBe('prizes')

    expect(item4).toBeTruthy()
    expect(item4.textContent).toBe('settings')
  })
})
