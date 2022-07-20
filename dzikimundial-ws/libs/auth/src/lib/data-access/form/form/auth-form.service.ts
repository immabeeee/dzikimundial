import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class AuthFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyAuthForm(): FormGroup {
    return this.formBuilder.group({
      login: this.formBuilder.control({ value: null, disabled: false }, [Validators.required]),
      password: this.formBuilder.control({ value: null, disabled: false }, [Validators.required]),
    })
  }
}
