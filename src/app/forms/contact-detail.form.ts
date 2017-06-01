import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export class ContactDetailForm {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      initials: [null, Validators.required],
      firstName: [null, Validators.required],
      prefix: [null],
      lastName: [null, Validators.required],
      mobilePhone: [null, Validators.required],
      phone: [null]
    });
  }
}
