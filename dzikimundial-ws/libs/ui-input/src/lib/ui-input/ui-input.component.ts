import { ChangeDetectionStrategy, Component,  forwardRef, Host, Inject, Input, OnInit, Optional, Self, SkipSelf, } from '@angular/core'
import { AbstractControl, ControlContainer, ControlValueAccessor, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, RequiredValidator, ValidationErrors, Validator } from '@angular/forms'

@Component({
  selector: 'dzikimundial-ws-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true,
    },
  ],
})
export class UiInputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() id?: string;
  @Input() label?: string;
  @Input() description?: string;
  @Input() type?: 'text' | 'number' = 'text';
  @Input() formControlName?: string;
  @Input() placeholder?: string;
  
  public value!: string
  public disabled!: boolean
  public validators?: any[];
  public onChange!: (value: any) => void
  public onTouched!: () => void
  public control!: AbstractControl | null | undefined;

  get isRequired(): boolean | undefined {
    if (!this.control || !this.control.validator){ return false }

    const validator = this.control?.validator({} as AbstractControl);
    return validator && validator.required;
  }

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer){
  }

  ngOnInit(): void {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer?.control?.get(this.formControlName);
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  writeValue(value: {value: string} | string ): void {
    if (value && !this.isString(value)){
      this.value = value.value;
    }
    else if (value && this.isString(value)){
      this.value = value;
    } else {
      this.value = "";
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  private isString(value: string | {value: any}): value is string {
    return typeof(value) === 'string';
  }
}
