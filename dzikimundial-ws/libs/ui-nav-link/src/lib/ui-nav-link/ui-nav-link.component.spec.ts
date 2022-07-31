import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { UiNavLinkComponent } from './ui-nav-link.component'
import { By } from '@angular/platform-browser'

describe('UiNavLinkComponent', () => {
  let component: UiNavLinkComponent
  let fixture: ComponentFixture<UiNavLinkComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UiNavLinkComponent],
    })
      .overrideComponent(UiNavLinkComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNavLinkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display nav link', () => {
    // given
    ;(component.text = 'players'), (component.link = '/players')
    fixture.detectChanges()
    const anchor: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a[data-test-id="dm-nav-link-anchor"]'),
    ).nativeElement

    // when

    // then
    expect(anchor).toBeDefined()
    expect(anchor.classList).toContain('nav-link-wrapper')
    expect(anchor.textContent).toContain('players')
  })

  it('should display return nav link', () => {
    // given
    component.text = 'players'
    component.link = '/players'
    component.isReturnLink = true
    fixture.detectChanges()
    const anchor: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a[data-test-id="dm-nav-link-anchor"]'),
    ).nativeElement

    // when

    // then
    expect(anchor).toBeDefined()
    expect(anchor.classList).toContain('nav-link-wrapper')
    expect(anchor.textContent).toContain('<')
  })

  it('should display secondary nav link', () => {
    // given
    ;(component.text = 'players'), (component.link = '/players')
    component.isSecondary = true
    fixture.detectChanges()
    const anchor: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a[data-test-id="dm-nav-link-anchor"]'),
    ).nativeElement

    // when

    // then
    expect(anchor).toBeDefined()
    expect(anchor.classList).toContain('secondary')
    expect(anchor.textContent).toContain('players')
  })

  it('should display secondary nav link', () => {
    // given
    ;(component.text = 'players'), (component.link = '/players')
    component.alignText = 'end'
    fixture.detectChanges()
    const anchor: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a[data-test-id="dm-nav-link-anchor"]'),
    ).nativeElement

    // when
    // then
    expect(anchor).toBeDefined()
    expect(getComputedStyle(anchor).getPropertyValue(`--alignText`)).toContain('end')
  })
})
