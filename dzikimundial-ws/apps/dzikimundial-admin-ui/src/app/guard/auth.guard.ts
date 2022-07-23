import { Injectable } from '@angular/core'
import { ActivatedRoute, CanActivate, CanLoad, Router, UrlTree } from '@angular/router'
import { AuthService } from '@dzikimundial-ws/auth'
import { map, Observable, of, switchMap, take, tap } from 'rxjs'

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isUserLoggedIn.pipe(
      take(1),
      switchMap((isUserLoggedIn: boolean) => {
        if (isUserLoggedIn) {
          return of(isUserLoggedIn)
        } else {
          return this.authService.isUnexpiredTokenInStorage()
        }
      }),
      tap((isUserLoggedIn: boolean) => {
        if (!isUserLoggedIn) {
          this.router.navigateByUrl('/auth')
        }
      }),
    )
  }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isUnexpiredTokenInStorage().pipe(
      take(1),
      map((isUnexpiredTokenInStorage: boolean) => !isUnexpiredTokenInStorage),
      tap((isUnexpiredTokenInStorage: boolean) => {
        if (!isUnexpiredTokenInStorage) {
          this.router.navigateByUrl('/tweets')
        }
      }),
    )
  }
}
