import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UiIconButtonComponent } from './ui-icon-button.component'

describe('UiIconButtonComponent', () => {
  let component: UiIconButtonComponent
  let fixture: ComponentFixture<UiIconButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiIconButtonComponent],
    })
      .overrideComponent(UiIconButtonComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(UiIconButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display button with icon', () => {
    // given
    component.icon = 'gg-close'
    fixture.detectChanges()
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[data-test-id="dm-icon-button"]'),
    ).nativeElement

    const icon: HTMLElement = fixture.debugElement.query(By.css('i[data-test-id="dm-icon-button-icon"]')).nativeElement

    // when

    // then
    expect(button.textContent).toContain('')
    expect(icon).toBeDefined()
    expect(icon.classList).toContain('gg-close')
  })

  it('should display button with loading icon', () => {
    // given
    component.icon = 'gg-close'
    component.isLoading = true
    fixture.detectChanges()
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[data-test-id="dm-icon-button"]'),
    ).nativeElement

    const icon: DebugElement = fixture.debugElement.query(By.css('i[data-test-id="dm-icon-button-icon"]'))
    const loadingIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-icon-button-loading-icon"]'),
    ).nativeElement

    // when

    // then
    expect(button.textContent).toContain('')
    expect(icon).toBe(null)
    expect(loadingIcon).toBeDefined()
    expect(loadingIcon.classList).toContain('gg-spinner-two')
  })

  it('should set disabled property to icon button', () => {
    // given
    component.icon = 'gg-close'
    component.isDisabled = true

    fixture.detectChanges()
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[data-test-id="dm-icon-button"]'),
    ).nativeElement

    // when

    // then
    expect(button.disabled).toBeTruthy()
    expect(button.classList).toContain('disabled')
  })
})
