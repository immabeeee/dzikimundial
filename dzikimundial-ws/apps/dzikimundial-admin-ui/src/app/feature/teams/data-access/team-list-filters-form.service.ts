import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Injectable()
export class TeamListFiltersFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(null),
      description: this.formBuilder.control(null),
    })
  }
}
