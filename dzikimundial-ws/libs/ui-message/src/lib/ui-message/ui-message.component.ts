import { Component, Input } from '@angular/core'

@Component({
  selector: 'dzikimundial-ws-ui-message',
  templateUrl: './ui-message.component.html',
  styleUrls: ['./ui-message.component.scss'],
})
export class UiMessageComponent {
  @Input() type: 'error' | 'warn' | 'info' | 'success' | 'primary' = 'primary'
  @Input() message?: string = 'default message'

  public isHidden = false

  public handleHideMessage(): void {
    this.isHidden = true
  }
}
