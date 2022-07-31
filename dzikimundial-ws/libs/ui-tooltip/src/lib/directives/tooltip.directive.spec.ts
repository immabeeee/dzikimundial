import { ChangeDetectionStrategy, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UiIconButtonComponent } from 'libs/ui-icon-button/src/lib/ui-icon-button/ui-icon-button.component'
import { By } from '@angular/platform-browser'
import { UiTooltipModule } from '../ui-tooltip.module'
import { TooltipDirective } from './tooltip.directive'

describe('UiTooltipComponent', () => {
  let component: UiIconButtonComponent
  let fixture: ComponentFixture<UiIconButtonComponent>
  let directiveEl: DebugElement
  let directiveInstance: TooltipDirective

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
    directiveEl = fixture.debugElement.query(By.directive(TooltipDirective))
    directiveInstance = directiveEl.injector.get(TooltipDirective)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should pass tooltip text to directive', () => {
    fixture.detectChanges()
    expect(directiveEl).not.toBeNull()
    expect((directiveInstance).tooltipContent).toBe('tooltip text')
    expect((directiveInstance).tooltipHide).toBe(false)
  })
})
