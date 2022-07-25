import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-nav-link',
  templateUrl: './ui-nav-link.component.html',
  styleUrls: ['./ui-nav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNavLinkComponent {
  @Input() text!: string
  @Input() name!: string
  @Input() link!: string
  @Input() isSecondary = false
  @Input() isReturnLink = false
  @Input() alignText: 'start' | 'center' | 'end' = 'center'
}
