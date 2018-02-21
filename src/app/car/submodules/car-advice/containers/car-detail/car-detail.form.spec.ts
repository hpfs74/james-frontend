import { FormBuilder } from '@angular/forms';
import { CarDetailForm } from './car-detail.form';

describe('Car Detail Form', () => {
  let form: CarDetailForm;

  beforeEach(() => {
    const mockHouseHold = [
      { label: 'Alleen ikzelf', value: 'CHM' }
    ];
    form = new CarDetailForm(new FormBuilder(), mockHouseHold. [], []);
  });

  it('should have validation errors defined', () => {
    expect(Object.keys(form.validationErrors)).toEqual([
      'required',
      'maxlength',
      'licensePlate',
      'licensePlateRDC',
      'birthDate',
      'gender',
      'claimFreeYears'
    ]);
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should init the form group', () => {
    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('licensePlate')).toBeDefined();
    expect(form.formGroup.get('birthDate')).toBeDefined();
    expect(form.formGroup.get('claimFreeYears')).toBeDefined();
    expect(form.formGroup.get('houseHold')).toBeDefined();
    expect(form.formGroup.get('loan')).toBeDefined();
    expect(form.formGroup.get('gender')).toBeDefined();
    expect(form.formGroup.get('coverage')).toBeDefined();
  });
});
