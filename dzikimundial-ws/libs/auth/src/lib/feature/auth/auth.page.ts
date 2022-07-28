import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { LoginUserResponse } from '@dzikimundial-ws/api-interfaces'
import { BehaviorSubject, catchError, concat, of, Subscription, take, tap, throwError } from 'rxjs'
import { AuthService } from '../../data-access/auth.service'
import { AuthFormService } from '../../data-access/form/form/auth-form.service'

@Component({
  selector: 'dzikimundial-ws-auth-page',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  animations: [],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  public form: FormGroup
  public isLoading = false

  private redirectTo!: string
  private subscriptions: Subscription = new Subscription()

  constructor(
    private authFormService: AuthFormService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.form = this.authFormService.createEmptyAuthForm()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        this.redirectTo = params.redirectTo
      }),
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  public onSubmit(): void {
    this.form.markAllAsTouched()
    
    if (!this.form.valid) {
      return
    }
    this.isLoading = true
    this.authService
      .signIn(this.form.getRawValue())
      .pipe(
        take(1),
        catchError((err) => {
          return concat(of(null), throwError(err))
        }),
      )
      .subscribe((response: LoginUserResponse | null) => {
        this.isLoading = false
        if (response) {
          this.authService.handleSignInUser(response.token, this.redirectTo)
        }
      })
  }
}
