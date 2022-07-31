import { ChangeDetectionStrategy, SimpleChange } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { TeamFormService } from '../../data-access/team-form.service'
import { TeamFormComponent } from './team-form.component'
import { TeamFormModule } from './team-form.module'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { TeamName } from '@dzikimundial-ws/api-interfaces'

describe('TeamFormComponent', () => {
  let component: TeamFormComponent
  let fixture: ComponentFixture<TeamFormComponent>
  let formService: TeamFormService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFormModule],
      declarations: [TeamFormComponent],
    })
      .overrideComponent(TeamFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(TeamFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    formService = new TeamFormService(new FormBuilder())
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the create team form', () => {
    // given
    component.form = formService.createEmptyTeamForm()
    component.isDisabled = false
    component.isLoading = false
    component.isEditMode = false
    fixture.detectChanges()

    // when
    const {
      form,
      nameDMInput,
      nameInput,
      nameLabel,
      descriptionDMInput,
      descriptionInput,
      descriptionLabel,
      logoUrlDMInput,
      logoUrlInput,
      logoUrlLabel,
      submitDMButton,
    } = getFormHTMLElements(fixture)

    // then
    expect(form).toBeDefined()
    expect(nameDMInput).toBeDefined()
    expect(nameInput.id).toContain('team-name')
    expect(nameInput.placeholder).toContain(component.teamNamePlaceholder)
    expect(nameLabel.textContent).toContain(component.teamNameLabel)
    expect(descriptionDMInput).toBeDefined()
    expect(descriptionInput.id).toContain('team-description')
    expect(descriptionInput.placeholder).toContain(component.teamDescriptionPlaceholder)
    expect(descriptionLabel.textContent).toContain(component.teamDescriptionLabel)
    expect(logoUrlDMInput).toBeDefined()
    expect(logoUrlInput.id).toContain('team-logo-url')
    expect(logoUrlInput.placeholder).toContain(component.teamLogoUrlPlaceholder)
    expect(logoUrlLabel.textContent).toContain(component.teamLogoUrlLabel)
    expect(submitDMButton).toBeDefined()
    expect(submitDMButton.textContent).toContain('Create')
  })

  it('should display the edit team form', () => {
    // given
    const team = teamsTestData.findTeam(TeamName.ARGENTINA)
    component.team = team
    component.isDisabled = false
    component.isLoading = false
    component.isEditMode = true
    component.ngOnChanges({
      team: new SimpleChange(null, team, true),
    })
    fixture.detectChanges()

    // when
    const {
      form,
      nameDMInput,
      nameInput,
      nameLabel,
      descriptionDMInput,
      descriptionInput,
      descriptionLabel,
      logoUrlDMInput,
      logoUrlInput,
      logoUrlLabel,
      submitDMButton,
    } = getFormHTMLElements(fixture)

    // then
    expect(form).toBeDefined()
    expect(nameDMInput).toBeDefined()
    expect(nameInput.id).toContain('team-name')
    expect(nameInput.placeholder).toContain(component.teamNamePlaceholder)
    expect(nameInput.value).toContain(team.name)
    expect(nameLabel.textContent).toContain(component.teamNameLabel)
    expect(descriptionDMInput).toBeDefined()
    expect(descriptionInput.id).toContain('team-description')
    expect(descriptionInput.placeholder).toContain(component.teamDescriptionPlaceholder)
    expect(descriptionInput.value).toContain(team.description)
    expect(descriptionLabel.textContent).toContain(component.teamDescriptionLabel)
    expect(logoUrlDMInput).toBeDefined()
    expect(logoUrlInput.id).toContain('team-logo-url')
    expect(logoUrlInput.placeholder).toContain(component.teamLogoUrlPlaceholder)
    expect(logoUrlInput.value).toContain(team.logo)
    expect(logoUrlLabel.textContent).toContain(component.teamLogoUrlLabel)
    expect(submitDMButton).toBeDefined()
    expect(submitDMButton.textContent).toContain('Update')
  })

  it('should display validation errors after submit empty team form', fakeAsync(() => {
    // given
    jest.spyOn(component, 'handleSubmit')
    component.form = formService.createEmptyTeamForm()
    component.isDisabled = false
    component.isLoading = false
    component.isEditMode = false
    fixture.detectChanges()

    // when
    const { form, nameInput, descriptionInput, logoUrlInput, submitDMButton } = getFormHTMLElements(fixture)
    nameInput.value = ''
    nameInput.dispatchEvent(new Event('input'))
    descriptionInput.value = ''
    descriptionInput.dispatchEvent(new Event('input'))
    logoUrlInput.value = ''
    logoUrlInput.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    submitDMButton.click()
    tick()
    fixture.detectChanges()

    // then
    expect(form).toBeDefined()
    expect(component.form.valid).toBe(false)
    expect(component.form.get('name')?.errors).toEqual({ required: true })
    expect(component.form.get('description')?.errors).toEqual({ required: true })
    expect(component.form.get('logoUrlImage')?.errors).toEqual({ required: true })
    expect(component.handleSubmit).toHaveBeenCalled()

    const {
      nameInputValidationErrorParagraph,
      descriptionInputValidationErrorParagraph,
      logoUrlInputValidationErrorParagraph,
    } = getFormHTMLElements(fixture)
    expect(nameInputValidationErrorParagraph).toBeDefined()
    expect(nameInputValidationErrorParagraph.textContent).toContain(component.teamNameRequiredValidationMessage)
    expect(descriptionInputValidationErrorParagraph).toBeDefined()
    expect(descriptionInputValidationErrorParagraph.textContent).toContain(
      component.teamDescriptionRequiredValidationMessage,
    )
    expect(logoUrlInputValidationErrorParagraph).toBeDefined()
    expect(logoUrlInputValidationErrorParagraph.textContent).toContain(component.teamLogoUrlRequiredValidationMessage)
  }))

  it('should call submitResult.emit after submit valid team form', fakeAsync(() => {
    // given
    jest.spyOn(component, 'handleSubmit')
    jest.spyOn(component.submitResult, 'emit')
    component.form = formService.createEmptyTeamForm()
    component.isDisabled = false
    component.isLoading = false
    component.isEditMode = false
    fixture.detectChanges()

    // when
    const { form, nameInput, descriptionInput, logoUrlInput, submitDMButton } = getFormHTMLElements(fixture)
    nameInput.value = 'test'
    nameInput.dispatchEvent(new Event('input'))
    descriptionInput.value = 'test'
    descriptionInput.dispatchEvent(new Event('input'))
    logoUrlInput.value = 'test'
    logoUrlInput.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    submitDMButton.click()
    tick()
    fixture.detectChanges()

    // then
    expect(form).toBeDefined()
    expect(component.form.valid).toBe(true)
    expect(component.handleSubmit).toHaveBeenCalled()
    expect(component.submitResult.emit).toHaveBeenCalledWith({
      description: 'test',
      logoUrlImage: 'test',
      name: 'test',
    })
  }))
})

function getFormHTMLElements(fixture: ComponentFixture<TeamFormComponent>): {
  form: HTMLFormElement
  nameDMInput: HTMLElement
  nameInput: HTMLInputElement
  nameInputValidationErrorParagraph: HTMLParagraphElement
  nameLabel: HTMLLabelElement
  descriptionDMInput: HTMLElement
  descriptionInput: HTMLInputElement
  descriptionInputValidationErrorParagraph: HTMLParagraphElement
  descriptionLabel: HTMLLabelElement
  logoUrlDMInput: HTMLElement
  logoUrlInput: HTMLInputElement
  logoUrlInputValidationErrorParagraph: HTMLParagraphElement
  logoUrlLabel: HTMLLabelElement
  submitDMButton: HTMLElement
  submitButton: HTMLButtonElement
} {
  const form: HTMLFormElement = fixture.debugElement.query(By.css('form[data-test-id="dm-team-form"]')).nativeElement
  const nameDMInput: HTMLElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-name-input"]'),
  ).nativeElement
  const nameInput: HTMLInputElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-name-input"] > div > input'),
  ).nativeElement
  const nameLabel: HTMLLabelElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-name-input"] > div > label'),
  ).nativeElement
  const nameInputValidationErrorParagraph: HTMLParagraphElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-validation-error[data-test-id="dm-team-form-name-validation-error"] * p'),
  )?.nativeElement
  const descriptionDMInput: HTMLElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-description-input"]'),
  ).nativeElement
  const descriptionInput: HTMLInputElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-description-input"] > div > input'),
  ).nativeElement
  const descriptionInputValidationErrorParagraph: HTMLParagraphElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-validation-error[data-test-id="dm-team-form-description-validation-error"] * p'),
  )?.nativeElement
  const descriptionLabel: HTMLLabelElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-description-input"] > div > label'),
  ).nativeElement
  const logoUrlDMInput: HTMLElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-logo-url-input"]'),
  ).nativeElement
  const logoUrlInput: HTMLInputElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-logo-url-input"] > div > input'),
  ).nativeElement
  const logoUrlInputValidationErrorParagraph: HTMLParagraphElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-validation-error[data-test-id="dm-team-form-logo-url-validation-error"] * p'),
  )?.nativeElement
  const logoUrlLabel: HTMLLabelElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-input[data-test-id="dm-team-form-logo-url-input"] > div > label'),
  ).nativeElement
  const submitDMButton: HTMLElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-button[data-test-id="dm-team-form-submit-button"]'),
  )?.nativeElement
  const submitButton: HTMLButtonElement = fixture.debugElement.query(
    By.css('dzikimundial-ws-ui-button[data-test-id="dm-team-form-submit-button"] > button'),
  )?.nativeElement

  return {
    form,
    nameDMInput,
    nameInput,
    nameInputValidationErrorParagraph,
    nameLabel,
    descriptionDMInput,
    descriptionInput,
    descriptionInputValidationErrorParagraph,
    descriptionLabel,
    logoUrlDMInput,
    logoUrlInput,
    logoUrlInputValidationErrorParagraph,
    logoUrlLabel,
    submitDMButton,
    submitButton,
  }
}
