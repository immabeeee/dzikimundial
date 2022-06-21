import { async, fakeAsync, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { BetsSingleFormService } from './bets-single-form.service'

describe('BetsSingleFormService', () => {
  let service: BetsSingleFormService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BetsSingleFormService, FormBuilder],
    }).compileComponents()
  }))
  beforeEach(() => {
    service = TestBed.get(BetsSingleFormService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should create empty single bet form', () => {
    // given

    // when
    const form = service.createEmptySingleGoalsBetForm()

    // then
    expect(form).toBeDefined()
    expect(form.errors).toBe(null)
    expect(form.valid).toBe(false)
    expect(form.value).toEqual({
      homeGoals: null,
      awayGoals: null,
    })
    expect(form.getRawValue()).toEqual({
      homeGoals: null,
      awayGoals: null,
    })
  })

  describe('form errors', () => {
    it('should set required error after marked form as touched', fakeAsync(() => {
      // given
      const emptyForm1 = service.createEmptySingleGoalsBetForm()

      // when
      emptyForm1.markAsTouched()

      // then
      expect(emptyForm1.getRawValue()).toEqual({
        homeGoals: null,
        awayGoals: null,
      })
      expect(emptyForm1.valid).toEqual(false)
      expect(emptyForm1.controls.homeGoals.valid).toEqual(false)
      expect(emptyForm1.controls.homeGoals.errors).toEqual({
        required: true,
      })
      expect(emptyForm1.controls.awayGoals.valid).toEqual(false)
      expect(emptyForm1.controls.awayGoals.errors).toEqual({
        required: true,
      })
    }))
  })

  it('should set min error after marked form as touched with incorrect value', fakeAsync(() => {
    // given
    const emptyForm1 = service.createEmptySingleGoalsBetForm()

    // when
    emptyForm1.controls.awayGoals.setValue(-1)
    emptyForm1.markAsTouched()

    // then
    expect(emptyForm1.getRawValue()).toEqual({
      homeGoals: null,
      awayGoals: -1,
    })
    expect(emptyForm1.valid).toEqual(false)
    expect(emptyForm1.controls.awayGoals.valid).toEqual(false)
    expect(emptyForm1.controls.awayGoals.errors).toEqual({
      min: {
        actual: -1,
        min: 0,
      },
    })
  }))

  it('should set max error after marked form as touched with incorrect value', fakeAsync(() => {
    // given
    const emptyForm1 = service.createEmptySingleGoalsBetForm()

    // when
    emptyForm1.controls.awayGoals.setValue(100)
    emptyForm1.markAsTouched()

    // then
    expect(emptyForm1.getRawValue()).toEqual({
      homeGoals: null,
      awayGoals: 100,
    })
    expect(emptyForm1.valid).toEqual(false)
    expect(emptyForm1.controls.awayGoals.valid).toEqual(false)
    expect(emptyForm1.controls.awayGoals.errors).toEqual({
      max: {
        actual: 100,
        max: 99,
      },
    })
  }))
})
