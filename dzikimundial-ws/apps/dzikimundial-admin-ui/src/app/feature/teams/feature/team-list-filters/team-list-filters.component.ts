import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'dzikimundial-ws-admin-team-list-filters',
  templateUrl: './team-list-filters.component.html',
  styleUrls: ['./team-list-filters.component.scss'],
})
export class TeamListFiltersComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control({value: null}),
      team: this.formBuilder.control({value: null}, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(e=>console.log(e))
  }
}
