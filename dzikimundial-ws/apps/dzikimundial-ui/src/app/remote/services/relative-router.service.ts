import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from './../../../environments/environment'

export const REMOTE_APP_PREFIX = new InjectionToken<string>('REMOTE_APP_PREFIX')

@Injectable()
export class RelativeRouterService {
  private appPrefix!: string
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Optional() @Inject(REMOTE_APP_PREFIX) appPrefix?: string,
  ) {
    this.appPrefix = appPrefix ? appPrefix : environment.appPrefix
  }

  public navigateTo(realativePath: string): void {
    this.router.navigate([this.appPrefix, realativePath], { relativeTo: this.route })
  }
}
