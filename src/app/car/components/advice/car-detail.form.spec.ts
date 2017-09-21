import { FormBuilder } from '@angular/forms';
import { CarDetailForm } from './car-detail.form';

describe('Car Detail Form', () => {
  let form: CarDetailForm;

  beforeEach(() => {
    form = new CarDetailForm(new FormBuilder());
  });

  it('should have validation errors defined', () => {
    expect(Object.keys(form.validationErrors)).toEqual([
      'required',
      'maxlength',
      'licensePlate',
      'licensePlateRDC',
      'birthDate',
      'postalCode',
      'gender',
      'address',
      'houseNumber',
      'claimFreeYears'
    ]);
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should have an address form group defined', () => {
    expect(form.addressForm).toBeDefined();
  });
});
