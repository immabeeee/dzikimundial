import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-tooltip',
  templateUrl: './ui-tooltip.component.html',
  styleUrls: ['./ui-tooltip.component.scss'],
})
export class UiTooltipComponent implements OnInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLElement>
  top: string | null = null
  left: string | null = null

  constructor(
    @Inject('tooltipConfig')
    private config: {
      host: HTMLElement
    },
  ) {}

  ngOnInit(): void {
    this.calculateTooltipPosition()
  }

  private calculateTooltipPosition(): void {
    const { left, top, width, height } = this.config.host.getBoundingClientRect()

    const tooltipArrowHeight = 10
    const contentLeft: number = left + width / 2
    const contentTop: number = top + height + tooltipArrowHeight

    this.left = `${contentLeft}px`
    this.top = `${contentTop}px`
  }
}
