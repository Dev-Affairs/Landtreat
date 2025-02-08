import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  forwardRef,
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appStrongPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StrongPasswordDirective),
      multi: true,
    },
  ],
})
export class StrongPasswordDirective implements Validator {
  @Input('appStrongPassword') originalPass!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) {
      return null; // consider empty values valid or use required validator
    }

    if (this.el.nativeElement.placeholder === 'Password') {
      const regex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W]).{8,}$'
      );
      const valid = regex.test(password);
      if (valid === false) {
        this.renderer.addClass(this.el.nativeElement, 'input-validation-error');
      } else {
        this.renderer.removeClass(
          this.el.nativeElement,
          'input-validation-error'
        );
      }
      return valid ? null : { strongPassword: true };
    } 
    
    else if (this.el.nativeElement.placeholder === 'Confirm Password') {
      console.log(this.originalPass, 'test');
      const confirmPassword = control.value;
      const isMatchPassword = this.originalPass === confirmPassword;
      if (isMatchPassword) {
        this.renderer.removeClass(
          this.el.nativeElement,
          'input-validation-error'
        );
      } else {
        this.renderer.addClass(this.el.nativeElement, 'input-validation-error');
      }

      return isMatchPassword ? null : { matchPassword: true };
    }

    else if (this.el.nativeElement.placeholder === 'Email'){
  console.log(this.el.nativeElement,"-- email inside directive")
      const email = control.value

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(email){
        let isValidEmail = emailRegex.test(email)
        console.log("isValidEmail-", isValidEmail)
       const isMailValid = isValidEmail

       if (isMailValid) {
        this.renderer.removeClass(this.el.nativeElement, 'input-validation-error');
       } else {
        this.renderer.addClass(this.el.nativeElement, 'input-validation-error');
       }
       return isMailValid ? null : {mailValid:true}
      }    
    }

    else if (this.el.nativeElement.placeholder === 'First Name') {
      const firstName = control.value

      return firstName ? null : {isFirstName:true}
    }

    else if(this.el.nativeElement.placeholder === '+91 Phone Number'){
      const numberValidation = /^[0-9]+$/;

      let isNumberValid 

      if (numberValidation.test(control.value)) {
        console.log("correct")
        isNumberValid = true
        if (control.value.length < 10) {
          isNumberValid = false
        } else if (control.value.length == 10) {
          isNumberValid = true
        } else if (control.value.length > 10) {
          isNumberValid = false
        }
      } else {
        console.log("wrong")
        isNumberValid = false
      }
      return isNumberValid ? null : {numberValid:true}
    }

    return null;
  }
}
