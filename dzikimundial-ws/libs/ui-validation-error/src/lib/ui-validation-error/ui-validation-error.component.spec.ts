import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UiValidationErrorComponent } from './ui-validation-error.component'
import { UiValidationErrorModule } from './../ui-validation-error.module'
import { ChangeDetectionStrategy } from '@angular/core'

describe('UiValidationErrorComponent', () => {
  let component: UiValidationErrorComponent
  let fixture: ComponentFixture<UiValidationErrorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiValidationErrorModule],
      declarations: [UiValidationErrorComponent],
    })
    .overrideComponent(UiValidationErrorComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UiValidationErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display validation error', () => {
    // given
    component.isHidden = false
    component.message = 'The field is required'
    fixture.detectChanges()

    const valiationParagraph: HTMLInputElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-validation-error"]'),
    )?.nativeElement

    // when

    // then
    console.log("valiationParagraph: ", valiationParagraph)
    expect(valiationParagraph).toBeDefined()
    expect(valiationParagraph.textContent).toContain('The field is required')
  })

  it('shouldnt display validation error', () => {
    // given
    component.isHidden = true
    component.message = 'The field is required'
    fixture.detectChanges()

    const valiationParagraph: HTMLInputElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-validation-error"]'),
    )?.nativeElement

    // when

    // then
    expect(valiationParagraph).toBe(undefined)
  })
})
