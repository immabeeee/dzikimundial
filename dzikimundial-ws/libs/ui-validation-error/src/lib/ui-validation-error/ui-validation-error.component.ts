import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-validation-error',
  templateUrl: './ui-validation-error.component.html',
  styleUrls: ['./ui-validation-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiValidationErrorComponent {
  @Input() isHidden = false
  @Input() message!: string
}
