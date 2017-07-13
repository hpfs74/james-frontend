import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileForm } from './profile.form';

describe('Form: Profile', () => {
  let form: ProfileForm;

  beforeEach(() => {
    form = new ProfileForm(new FormBuilder());
  });

  it('should initialize the form controls', () => {
    expect(form.formGroup.get('avatar')).toBeDefined();
    expect(form.formGroup.get('gender')).toBeDefined();
    expect(form.formGroup.get('firstName')).toBeDefined();
    expect(form.formGroup.get('lastName')).toBeDefined();
    expect(form.formGroup.get('birthDate')).toBeDefined();
    expect(form.formGroup.get('pushNotifications')).toBeDefined();
    expect(form.formGroup.get('emailNotifications')).toBeDefined();
  });

  it('should init the form options', () => {
    expect(form.formConfig).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBe(7);
  });

  it('should init validation errors', () => {
    expect(form.validationErrors).toBeDefined();
  });

  //TODO: add more tests
});
