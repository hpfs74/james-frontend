import { birthDateMask, nameInitialMask, validateForm } from './base-form.utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';

describe('Base Form Util', () => {
  it('should decode birth date', () => {
    const testDate = '01/01/1950';
    expect(birthDateMask.decode(testDate)).toEqual(new Date(testDate));
  });

  it('should decode initials', () => {
    expect(nameInitialMask.decode('A. B. ')).toEqual('AB');
  });

  it('should validate form', () => {
    const testForm = new FormGroup({
      first: new FormControl('Nancy', Validators.minLength(10)),
      last: new FormControl('Drew'),
    });
    expect(testForm.controls.first.touched).toEqual(false);
    validateForm(testForm);
    expect(testForm.controls.first.touched).toEqual(true);
    expect(testForm.valid).toEqual(false);
  });
});
