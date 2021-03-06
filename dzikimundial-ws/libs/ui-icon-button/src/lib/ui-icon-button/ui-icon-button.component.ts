import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-icon-button',
  templateUrl: './ui-icon-button.component.html',
  styleUrls: ['./ui-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconButtonComponent {
  @Input() icon!:
    | 'gg-more'
    | 'gg-close'
    | 'gg-more-vertical-alt'
    | 'gg-eye'
    | 'gg-lock-unlock'
    | 'gg-lock'
    | 'gg-log-off'
    | 'gg-user-list'
    | 'gg-sun'
    | 'gg-moon'
    | 'gg-remove'
    | 'gg-trash'
    | 'gg-edit-markup'
  @Input() isLoading = false
  @Input() isDisabled = false
}
