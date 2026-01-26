import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const hasMinLength = value.length >= 8;
    const hasMaxLength = value.length <= 14;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasMinLength && hasMaxLength && hasUpperCase && 
                    hasLowerCase && hasNumber && hasSpecialChar;

    return !isValid ? { passwordStrength: true } : null;
  };
}   