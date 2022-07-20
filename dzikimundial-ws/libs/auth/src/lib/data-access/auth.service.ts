import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs'
import { AuthRestService } from './auth.rest.service'
import { JwtService } from './jwt.service'

@Injectable()
export class AuthService {
  private user$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null)

  constructor(private authRestService: AuthRestService, private jwtService: JwtService, private router: Router) {}

  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: any | null) => {
        const isUserAuthenticated = !!user
        return of(isUserAuthenticated)
      }),
    )
  }

  get userRole(): Observable<any | undefined> {
    return this.user$.asObservable().pipe(
      switchMap((user: any | null) => {
        return of(user?.user?.role)
      }),
    )
  }

  public signIn({ login, password }: any): Observable<any> {
    const request: any = {
      login,
      password,
    }

    return this.authRestService.signIn(request)
  }

  public isUnexpiredTokenInStorage(): Observable<boolean> {
    return of(this.jwtService.getDecodedToken()).pipe(
      map((user: any | null) => {
        if (!user || this.isTokenExpired(user.exp)) {
          return false
        }

        this.user$.next(user)
        return true
      }),
    )
  }

  public logout(): void {
    this.user$.next(null)
    this.jwtService.clearToken()
    this.router.navigateByUrl('/auth')
  }

  public handleSignInUser(token: string, redirectTo: string): void {
    const redirect = redirectTo ? redirectTo : '/'

    this.jwtService.saveToken(token)
    const decodedToken: any | null = this.jwtService.getDecodedToken()
    this.user$.next(decodedToken)
    this.router.navigateByUrl(redirect)
  }

  private isTokenExpired(exp: number): boolean {
    return new Date() > new Date(exp * 1000)
  }
}
