import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UiProgressBarComponent } from './ui-progress-bar.component'

describe('UiProgressBarComponent', () => {
  let component: UiProgressBarComponent
  let fixture: ComponentFixture<UiProgressBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiProgressBarComponent],
    })
      .overrideComponent(UiProgressBarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UiProgressBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display progress bar', () => {
    // given
    fixture.detectChanges()
    const progressBarContainer: HTMLDivElement = fixture.debugElement.query(
      By.css('a[data-test-id=" dm-progres-bar"]'),
    ).nativeElement

    // when

    // then
    expect(progressBarContainer).toBeDefined()
  })
})
