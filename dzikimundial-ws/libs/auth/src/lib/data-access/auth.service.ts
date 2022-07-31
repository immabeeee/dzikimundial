import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, from, map, Observable, of, switchMap } from 'rxjs'
import { AuthRestService } from './auth.rest.service'
import { JwtService } from './jwt.service'
import { DecodedToken, LoginUserRequest, LoginUserResponse, Role, User } from '@dzikimundial-ws/api-interfaces'

@Injectable()
export class AuthService {
  private decodedToken$: BehaviorSubject<DecodedToken | null> = new BehaviorSubject<DecodedToken | null>(null)

  constructor(private authRestService: AuthRestService, private jwtService: JwtService, private router: Router) {}

  get isUserLoggedIn(): Observable<boolean> {
    return this.decodedToken$.asObservable().pipe(
      switchMap((decodedToken: DecodedToken | null) => {
        const isUserAuthenticated = !!decodedToken
        return of(isUserAuthenticated)
      }),
    )
  }

  get loggedUser$(): Observable<User | undefined> {
    return this.decodedToken$.asObservable().pipe(switchMap((decodedToken) => of(decodedToken?.user)))
  }

  get userRole(): Observable<Role | null> {
    return this.decodedToken$.asObservable().pipe(
      switchMap((decodedToken: DecodedToken | null) => {
        return decodedToken?.user ? of(decodedToken.user?.role) : of(null)
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
      map((decodedToken: DecodedToken | null) => {
        if (!decodedToken || this.isTokenExpired(decodedToken.exp)) {
          return false
        }

        this.decodedToken$.next(decodedToken)
        return true
      }),
    )
  }

  public logout(): void {
    this.decodedToken$.next(null)
    this.jwtService.clearToken()
    this.router.navigateByUrl('/auth')
  }

  public handleSignInUser(token: string, redirectTo: string): void {
    const redirect = redirectTo ? redirectTo : '/'

    this.jwtService.saveToken(token)
    const decodedToken: any | null = this.jwtService.getDecodedToken()
    this.decodedToken$.next(decodedToken)
    this.router.navigateByUrl(redirect)
  }

  private isTokenExpired(exp: number): boolean {
    return new Date() > new Date(exp * 1000)
  }
}
