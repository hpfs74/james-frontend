import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IbanForm } from './iban.form';

describe('Form: Iban', () => {
  let form: IbanForm;

  beforeEach(() => {
    form = new IbanForm(new FormBuilder());
  });

  it('should initialize the form controls', () => {
    expect(form.formGroup.get('startDate')).toBeDefined();
    expect(form.formGroup.get('iban')).toBeDefined();
  });

  it('should init the form options', () => {
    expect(form.formConfig).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBe(2);
  });

  it('should init validation errors', () => {
    expect(form.validationErrors).toBeDefined();
    expect(form.validationErrors.required).toBeDefined();
    expect(form.validationErrors.startDate).toBeDefined();
    expect(form.validationErrors.iban).toBeDefined();
  });
});
