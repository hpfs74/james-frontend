import { FormBuilder } from '@angular/forms';
import { CarCheckForm } from '@car/submodules/car-buy/containers/car-check/car-check.form';


describe('Car Check Form', () => {
  let form: CarCheckForm;

  beforeEach(() => {
    form = new CarCheckForm(new FormBuilder());
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should init the form group', () => {
    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('crime')).toBeDefined();
    expect(form.formGroup.get('crimeComment')).toBeDefined();
    expect(form.formGroup.get('debt')).toBeDefined();
    expect(form.formGroup.get('debtComment')).toBeDefined();
    expect(form.formGroup.get('refuse')).toBeDefined();
    expect(form.formGroup.get('refuseComment')).toBeDefined();
    expect(form.formGroup.get('driver')).toBeDefined();
    expect(form.formGroup.get('driverComment')).toBeDefined();
    expect(form.formGroup.get('cause')).toBeDefined();
    expect(form.formGroup.get('causeComment')).toBeDefined();
    expect(form.formGroup.get('register')).toBeDefined();
    expect(form.formGroup.get('registerComment')).toBeDefined();
  });
});
