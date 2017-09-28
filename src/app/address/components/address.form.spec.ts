import { FormBuilder } from '@angular/forms';
import { AddressForm } from './address.form';

describe('AddressForm', () => {
  it('should create a new form', () => {
    const fb = new FormBuilder();
    const form = new AddressForm(fb);

    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('postalCode')).toBeDefined();
    expect(form.formGroup.get('houseNumber')).toBeDefined();
    expect(form.formGroup.get('houseNumberExtension')).toBeDefined();

    expect(form.validationErrors).toBeDefined();
    expect(form.validationErrors.required).toBeDefined();
    expect(form.validationErrors.postalCode).toBeDefined();
    expect(form.validationErrors.address).toBeDefined();
    expect(form.validationErrors.houseNumber).toBeDefined();

    expect(form.formConfig).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBeGreaterThan(1);
  });
});
