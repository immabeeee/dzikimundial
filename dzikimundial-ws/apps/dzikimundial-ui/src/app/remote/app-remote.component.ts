import { Component } from '@angular/core'
import { RelativeRouterService } from './services/relative-router.service'
import { changeTheme } from '@dzikimundial-ws/theme'

@Component({
  selector: 'dzikimundial-ws-remote-root',
  templateUrl: './app-remote.component.html',
  styleUrls: ['./app-remote.component.scss'],
})
export class AppRemoteComponent {
  constructor(private relativeRouterService: RelativeRouterService) {
    changeTheme()
  }

  navigate(path: string): void {
    this.relativeRouterService.navigateTo(path)
  }
}
