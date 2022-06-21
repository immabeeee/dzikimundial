import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  @Input() icon!: 'gg-close'
  @Input() text!: string
  @Input() isLoading = false
  @Input() isDisabled = false
}
