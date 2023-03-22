import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export interface UserLogin {
  password: string | (((control: AbstractControl) => (ValidationErrors | null)) | ValidatorFn)[];
  email: string | { validators: ((control: AbstractControl) => (ValidationErrors | null))[]; updateOn: string }
}
