import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class TeamFormService {
    constructor(private formBuilder: FormBuilder){}

    public createEmptyTeamForm(): FormGroup{
        return this.formBuilder.group({
            id: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
            description: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
            name: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
            logo: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
        })
    }
}
