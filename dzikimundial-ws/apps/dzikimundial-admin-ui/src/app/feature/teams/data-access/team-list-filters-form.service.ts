import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Filter } from '@dzikimundial-ws/api-interfaces'

@Injectable()
export class TeamListFiltersFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(null),
      description: this.formBuilder.control(null),
    })
  }

  public fillForm(form: FormGroup, filters?: Filter[]): void {
    if (!filters) return
    form.patchValue({
      name: filters.find((e) => e.name === 'name'),
      description: filters.find((e) => e.name === 'description'),
    })
  }
}
