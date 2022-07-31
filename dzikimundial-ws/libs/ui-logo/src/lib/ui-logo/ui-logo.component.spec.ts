import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UiLogoComponent } from './ui-logo.component'

describe('UiLogoComponent', () => {
  let component: UiLogoComponent
  let fixture: ComponentFixture<UiLogoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiLogoComponent],
    })
      .overrideComponent(UiLogoComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLogoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display logo', () => {
    // given
    component.isBig = false
    fixture.detectChanges()
    const paragraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-logo-paragraph"]'),
    ).nativeElement

    // when

    // then
    expect(paragraph).toBeDefined()
    expect(paragraph.classList).not.toContain('big')
    expect(paragraph.textContent).toContain('dzikimundial')
  })

  it('should display big logo', () => {
    // given
    component.isBig = true
    fixture.detectChanges()
    const paragraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-logo-paragraph"]'),
    ).nativeElement

    // when

    // then
    expect(paragraph).toBeDefined()
    expect(paragraph.classList).toContain('big')
    expect(paragraph.textContent).toContain('dzikimundial')
  })
})
