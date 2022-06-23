import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UiButtonComponent } from './ui-button.component'

describe('UiButtonComponent', () => {
  let component: UiButtonComponent
  let fixture: ComponentFixture<UiButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiButtonComponent],
    })
      .overrideComponent(UiButtonComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(UiButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display button text', () => {
    // given
    component.text = 'lorem ipsum'
    fixture.detectChanges()
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[data-test-id="dm-button"]'),
    ).nativeElement

    // when

    // then
    expect(button.textContent).toContain('lorem ipsum')
  })

  it('should display icon', () => {
    // given
    component.text = 'lorem ipsum'
    component.icon = 'gg-close'
    fixture.detectChanges()
    const icon: HTMLElement = fixture.debugElement.query(By.css('.gg-close')).nativeElement

    // when

    // then
    expect(icon).toBeTruthy()
  })

  it('should display loading icon', () => {
    // given
    component.text = 'lorem ipsum'
    component.isLoading = true
    fixture.detectChanges()
    const icon: HTMLElement = fixture.debugElement.query(By.css('.gg-spinner-two')).nativeElement

    // when

    // then
    expect(icon).toBeTruthy()
  })

  it('should set disabled property to button', () => {
    // given
    component.text = 'lorem ipsum'
    component.isDisabled = true

    fixture.detectChanges()
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[data-test-id="dm-button"]'),
    ).nativeElement

    // when

    // then
    expect(button.disabled).toBeTruthy()
  })
})
