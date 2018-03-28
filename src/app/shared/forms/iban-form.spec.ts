import { FormBuilder } from '@angular/forms';
import { IbanForm } from './iban.form';

describe('Form: Iban', () => {
  let form: IbanForm;

  beforeEach(() => {
    form = new IbanForm(new FormBuilder());
  });

  it('should initialize the form controls', () => {
    expect(form.formGroup.get('iban')).toBeDefined();
  });

  it('should init the form options', () => {
    expect(form.formConfig).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBe(1);
  });

  it('should init validation errors', () => {
    expect(form.validationErrors).toBeDefined();
    expect(form.validationErrors.required).toBeDefined();
    expect(form.validationErrors.iban).toBeDefined();
  });
});
