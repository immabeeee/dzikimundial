import { TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { TeamFormService } from './team-form.service'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { TeamName } from '@dzikimundial-ws/api-interfaces'

describe('TeamFormService', () => {
  let service: TeamFormService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [TeamFormService, FormBuilder],
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(TeamFormService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should create an empty team form', () => {
    // given

    // when
    const form = service.createEmptyTeamForm()

    // then
    expect(form).toBeTruthy()
    expect(form.invalid).toBe(true)
    expect(form.get('name')).toBeTruthy()
    expect(form.get('name')?.value).toBe(null)
    expect(form.get('name')?.disabled).toBe(false)
    expect(form.get('name')?.valid).toBe(false)
    expect(form.get('name')?.errors).toEqual({ required: true })
    expect(form.get('description')).toBeTruthy()
    expect(form.get('description')?.value).toBe(null)
    expect(form.get('description')?.disabled).toBe(false)
    expect(form.get('description')?.valid).toBe(false)
    expect(form.get('description')?.errors).toEqual({ required: true })
    expect(form.get('logoUrlImage')).toBeTruthy()
    expect(form.get('logoUrlImage')?.value).toBe(null)
    expect(form.get('logoUrlImage')?.disabled).toBe(false)
    expect(form.get('logoUrlImage')?.valid).toBe(false)
    expect(form.get('logoUrlImage')?.errors).toEqual({ required: true })
  })

  it('should fill the provided form', () => {
    // given
    const form = service.createEmptyTeamForm()
    const team = teamsTestData.findTeam(TeamName.ARGENTINA)

    // when
    service.fillTeamForm(form, team)

    // then
    expect(form).toBeTruthy()
    expect(form.invalid).toBe(false)
    expect(form.get('name')).toBeTruthy()
    expect(form.get('name')?.value).toBe(team.name)
    expect(form.get('name')?.disabled).toBe(false)
    expect(form.get('name')?.valid).toBe(true)
    expect(form.get('name')?.errors).toEqual(null)
    expect(form.get('description')).toBeTruthy()
    expect(form.get('description')?.value).toBe(team.description)
    expect(form.get('description')?.disabled).toBe(false)
    expect(form.get('description')?.valid).toBe(true)
    expect(form.get('description')?.errors).toEqual(null)
    expect(form.get('logoUrlImage')).toBeTruthy()
    expect(form.get('logoUrlImage')?.value).toBe(team.logo)
    expect(form.get('logoUrlImage')?.disabled).toBe(false)
    expect(form.get('logoUrlImage')?.valid).toBe(true)
    expect(form.get('logoUrlImage')?.errors).toEqual(null)
  })
})
