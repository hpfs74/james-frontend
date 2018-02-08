import { FormBuilder } from '@angular/forms';
import { HouseHoldDekkingForm } from './house-hold-dekking.form';


describe('HouseHold Dekking Form', () => {
  let form: HouseHoldDekkingForm;

  beforeEach(() => {
    const mockHouseHold = [];
    form = new HouseHoldDekkingForm(new FormBuilder(), mockHouseHold);
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should init the form group', () => {
    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('outsideCoverage')).toBeDefined();
    expect(form.formGroup.get('netIncomeRange')).toBeDefined();
    expect(form.formGroup.get('dateOfBirth')).toBeDefined();
    expect(form.formGroup.get('familySituation')).toBeDefined();
  });

  it ('should not be valid if date is wrong', () => {

  });
});
