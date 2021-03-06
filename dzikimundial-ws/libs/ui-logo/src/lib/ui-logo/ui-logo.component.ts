import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-logo',
  templateUrl: './ui-logo.component.html',
  styleUrls: ['./ui-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLogoComponent {
  @Input() isBig = false;
}
