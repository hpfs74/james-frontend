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

  // describe('FormControl: licensePlate', () => {
  //   it('should be maximum of 8 characters', () => {
  //     const ctrl = form.formGroup.get('lisencePlate');
  //     ctrl.setValue('XX');
  //     expect(ctrl.valid).toBeTruthy();
  //     ctrl.setValue('XX-XX-XX-XX');
  //     expect(ctrl.valid).toBeFalsy();
  //   });
  // });

  // describe('FormControl: birthDate', () => {

  // });

  // describe('FormControl: claimFreeYears', () => {
  //   it('should be greater than 0', () => {
  //     const ctrl = form.formGroup.get('claimFreeYears');
  //     ctrl.setValue(-2);
  //     expect(ctrl.valid).toBeFalsy();
  //   });

  //   it('should be less than or equal to 50', () => {
  //     const ctrl = form.formGroup.get('claimFreeYears');
  //     ctrl.setValue(50);
  //     expect(ctrl.valid).toBeTruthy();
  //     ctrl.setValue(51);
  //     expect(ctrl.valid).toBeFalsy();
  //   });
  // });

});
