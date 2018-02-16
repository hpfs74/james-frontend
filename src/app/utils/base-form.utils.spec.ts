import {
  birthDateMask,
  nameInitialMask,
  dateDecode,
  validateForm,
  toDateFormat,
  parseNicciDate,
  toNicciDate,
  toDateType
} from './base-form.utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';

describe('Base Form Util', () => {
  it('should decode birth date', () => {
    const testDate = '01/01/1950';
    expect(birthDateMask.decode(testDate)).toEqual(new Date(testDate));
  });

  it('should decode initials', () => {
    expect(nameInitialMask.decode('A. B. ')).toEqual('AB');
  });

  it('should decode date', () => {
    expect(dateDecode('12-12-2020')).toEqual(new Date(2020, 11, 12));
    expect(dateDecode('12/12/2020')).toEqual(new Date(2020, 11, 12));
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

  it('should format a Dutch date', () => {
    expect(toDateFormat(new Date(2016, 3, 30))).toEqual('30-04-2016');
  });

  it('should format a date in Date format', () => {
    expect(toDateType('30-04-2020')).toEqual(new Date(2020, 3, 30));
  });

  it('should handle null date', () => {
    expect(toDateType(null)).toBeNull();
    expect(toDateFormat(null)).toBeNull();
    expect(parseNicciDate(null)).toBeNull();
  });

  it('should parse a date in NICCI format', () => {
    const testDate = '2016-04-30';
    expect(parseNicciDate(testDate)).toEqual(new Date(2016, 3, 30));
  });

  it('should format a date in NICCI format', () => {
    expect(toNicciDate(new Date(2016, 3, 30))).toEqual('2016-04-30');
  });
});
