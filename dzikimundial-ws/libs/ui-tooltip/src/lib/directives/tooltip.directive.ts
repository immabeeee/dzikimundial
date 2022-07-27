import {
  Directive,
  Input,
  TemplateRef,
  Type,
  ComponentRef,
  ElementRef,
  Renderer2,
  Injector,
  ComponentFactoryResolver,
  ViewContainerRef,
  HostListener,
  ReflectiveInjector,
  OnDestroy,
} from '@angular/core'
import { UiTooltipComponent } from '../ui/ui-tooltip/ui-tooltip.component'

@Directive({
  selector: '[dzikimundialWsTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltipContent!: string | TemplateRef<any> | Type<any> | undefined | null
  @Input() tooltipHide = false

  private componentRef: ComponentRef<UiTooltipComponent> | null = null

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
  ) {}

  ngOnDestroy() {
    this.destroy()
  }

  private destroy() {
    this.componentRef && this.componentRef.destroy()
    this.componentRef = null
  }

  private generateNgContent() {
    if (!this.tooltipContent) {
      return
    }

    if (typeof this.tooltipContent === 'string') {
      const element = this.renderer.createText(this.tooltipContent)
      return [[element]]
    }

    if (this.tooltipContent instanceof TemplateRef) {
      const context = {}
      const viewRef = this.tooltipContent.createEmbeddedView(context)
      return [viewRef.rootNodes]
    }

    const factory = this.resolver.resolveComponentFactory(this.tooltipContent)
    const componentRef = factory.create(this.injector)
    return [[componentRef.location.nativeElement]]
  }

  @HostListener('mouseenter')
  private mouseenter() {
    if (this.componentRef || this.tooltipHide || !this.tooltipContent) return
    const factory = this.resolver.resolveComponentFactory(UiTooltipComponent)

    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.element.nativeElement,
        },
      },
    ])

    this.componentRef = this.vcr.createComponent(factory, 0, injector, this.generateNgContent())
  }

  @HostListener('mouseleave')
  private mouseleave() {
    this.destroy()
  }
}
