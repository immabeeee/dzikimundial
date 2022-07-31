import { TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { TeamListFiltersFormService } from './team-list-filters-form.service'

describe('TeamListFiltersFormService', () => {
  let service: TeamListFiltersFormService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [TeamListFiltersFormService, FormBuilder],
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(TeamListFiltersFormService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should create an empty form', () => {
    // given

    // when
    const form = service.createEmptyForm()

    // then
    expect(form).toBeTruthy()
    expect(form.invalid).toBe(false)
    expect(form.get('name')).toBeTruthy()
    expect(form.get('name')?.value).toBe(null)
    expect(form.get('name')?.disabled).toBe(false)
    expect(form.get('name')?.valid).toBe(true)
    expect(form.get('name')?.errors).toEqual(null)
    expect(form.get('description')).toBeTruthy()
    expect(form.get('description')?.value).toBe(null)
    expect(form.get('description')?.disabled).toBe(false)
    expect(form.get('description')?.valid).toBe(true)
    expect(form.get('description')?.errors).toEqual(null)
  })
})
