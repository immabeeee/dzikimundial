import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class BetsSingleFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptySingleGoalsBetForm(): FormGroup {
    return this.formBuilder.group({
      homeGoals: this.formBuilder.control({ value: null, disabled: false }, [
        Validators.required,
        Validators.min(0),
        Validators.max(99),
      ]),
      awayGoals: this.formBuilder.control({ value: null, disabled: false }, [
        Validators.required,
        Validators.min(0),
        Validators.max(99),
      ]),
    })
  }
}
