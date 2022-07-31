import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UiTooltipModule } from './../../ui-tooltip.module'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UiIconButtonComponent } from 'libs/ui-icon-button/src/lib/ui-icon-button/ui-icon-button.component'
import { By } from '@angular/platform-browser'

describe('UiTooltipComponent', () => {
  let component: UiIconButtonComponent
  let fixture: ComponentFixture<UiIconButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiIconButtonModule, UiTooltipModule],
      declarations: [UiIconButtonComponent],
    })
      .overrideComponent(UiIconButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          template: `
          <button dzikimundialWsTooltip [tooltipContent]="'tooltip text'" data-test-id="dm-icon-button">
          <i class="gg-edit-markup"></i>
          </button>
          `,
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UiIconButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display a tooltip after hover the button', () => {
    // given
    component.icon = 'gg-close'
    fixture.detectChanges()
    const buttonDebugElement: DebugElement = fixture.debugElement.query(By.css('button[data-test-id="dm-icon-button"]'))
    const button: HTMLButtonElement = buttonDebugElement.nativeElement

    // when
    buttonDebugElement.triggerEventHandler('mouseenter', {})
    fixture.detectChanges()

    const tooltipContainer: HTMLElement = document.querySelector('[data-test-id="dm-tooltip-container"]') as HTMLElement

    // then
    expect(button.textContent).toContain('')
    expect(tooltipContainer).toBeDefined()
    expect(tooltipContainer.textContent).toContain('tooltip text')
  })

  it('should hide a tooltip after hover the button', () => {
    // given
    component.icon = 'gg-close'
    fixture.detectChanges()
    const buttonDebugElement: DebugElement = fixture.debugElement.query(By.css('button[data-test-id="dm-icon-button"]'))

    // when
    buttonDebugElement.triggerEventHandler('mouseenter', {})
    fixture.detectChanges()
    const tooltipContainer: HTMLElement = document.querySelector('[data-test-id="dm-tooltip-container"]') as HTMLElement
    expect(tooltipContainer).toBeDefined()
    expect(tooltipContainer.textContent).toContain('tooltip text')

    // then
    buttonDebugElement.triggerEventHandler('mouseleave', {})
    const tooltipContainerAfterLeave: HTMLElement = document.querySelector(
      '[data-test-id="dm-tooltip-container"]',
    ) as HTMLElement
    fixture.detectChanges()
    expect(tooltipContainerAfterLeave).toBe(null)
  })
})
