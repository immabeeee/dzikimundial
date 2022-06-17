import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-flag',
  templateUrl: './ui-flag.component.html',
  styleUrls: ['./ui-flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFlagComponent {
  @Input() url!: string
  @Input() description = 'default description'
}
