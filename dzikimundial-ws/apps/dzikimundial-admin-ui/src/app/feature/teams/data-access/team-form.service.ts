import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class TeamFormService {
    constructor(private formBuilder: FormBuilder){}

    public createEmptyTeamForm(): FormGroup{
        return this.formBuilder.group({
            description: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
            name: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
            logoUrlImage: this.formBuilder.control({value: null, disabled: false}, [Validators.required]),
        })
    }
}
