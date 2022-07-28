import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs'
import { AuthRestService } from './auth.rest.service'
import { JwtService } from './jwt.service'
import { LoginUserRequest, LoginUserResponse, Role, User } from '@dzikimundial-ws/api-interfaces'

@Injectable()
export class AuthService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)

  constructor(private authRestService: AuthRestService, private jwtService: JwtService, private router: Router) {}

  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: User | null) => {
        const isUserAuthenticated = !!user
        return of(isUserAuthenticated)
      }),
    )
  }

  get userRole(): Observable<Role | null> {
    return this.user$.asObservable().pipe(
      switchMap((user: User | null) => {
        return user ? of(user?.role) : of(null)
      }),
    )
  }

  get token(): string {
    return this.jwtService.getToken()
  }

  public signIn({ login, password }: { login: string; password: string }): Observable<LoginUserResponse> {
    const request: LoginUserRequest = {
      login,
      password,
    }

    return this.authRestService.signIn(request)
  }

  public isUnexpiredTokenInStorage(): Observable<boolean> {
    return of(this.jwtService.getDecodedToken()).pipe(
      map((decodedToken: any | null) => {
        if (!decodedToken || this.isTokenExpired(decodedToken.exp)) {
          return false
        }

        this.user$.next(decodedToken)
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
