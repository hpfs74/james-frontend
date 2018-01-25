import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactDetailForm } from './contact-detail.form';

describe('Form: ContactDetail', () => {
  let form: ContactDetailForm;

  beforeEach(() => {
    form = new ContactDetailForm(new FormBuilder());
  });

  it('should initialize the form controls', () => {
    expect(form.formGroup.get('initials')).toBeDefined();
    expect(form.formGroup.get('firstName')).toBeDefined();
    expect(form.formGroup.get('middleName')).toBeDefined();
    expect(form.formGroup.get('lastName')).toBeDefined();
    expect(form.formGroup.get('mobileNumber')).toBeDefined();
    expect(form.formGroup.get('phoneNumber')).toBeDefined();
    expect(form.formGroup.get('saveToProfile')).toBeDefined();
    expect(form.initialMask).toBeDefined();
  });

  it('should init the form options', () => {
    expect(form.formConfig).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBe(7);
  });

  it('should init validation errors', () => {
    expect(form.validationErrors).toBeDefined();
    expect(form.validationErrors.minlength).toBeDefined();
    expect(form.validationErrors.mobileNumber).toBeDefined();
    expect(form.validationErrors.phoneNumber).toBeDefined();
    expect(form.validationErrors.maxlength).toBeDefined();
  });
});
