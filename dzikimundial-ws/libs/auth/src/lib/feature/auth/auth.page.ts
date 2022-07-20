import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Subscription, take } from 'rxjs'
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
  public isAuthLoading = false

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
    this.subscriptions.unsubscribe();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched()

    if (!this.form.valid) {
      return
    }

    this.isAuthLoading = true

    this.authService
      .signIn(this.form.getRawValue())
      .pipe(take(1))
      .subscribe(({ token }) => {
        this.isAuthLoading = false
        this.authService.handleSignInUser(token, this.redirectTo)
      })
  }
}
