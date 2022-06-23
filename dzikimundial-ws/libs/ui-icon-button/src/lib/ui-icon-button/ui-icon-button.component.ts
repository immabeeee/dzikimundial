import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-icon-button',
  templateUrl: './ui-icon-button.component.html',
  styleUrls: ['./ui-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconButtonComponent {
  @Input() icon!: 'gg-more' | 'gg-close' | 'gg-more-vertical-alt' | 'gg-eye' | 'gg-lock-unlock' | 'gg-lock'
  @Input() isLoading = false
}
