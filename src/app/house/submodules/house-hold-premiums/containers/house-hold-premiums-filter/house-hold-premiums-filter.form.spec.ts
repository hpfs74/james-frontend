import { FormBuilder } from '@angular/forms';
import { HouseHoldPremiumsFilterForm } from './house-hold-premiums-filter.form';

describe('HouseHold Location Form', () => {
  let form: HouseHoldPremiumsFilterForm;

  beforeEach(() => {
    const mockHouseHold = [
      {label: 'Default coverage', value: 'A'},
      {label: 'Extended coverage', value: 'B'}
    ];
    form = new HouseHoldPremiumsFilterForm(new FormBuilder(), mockHouseHold);
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should init the form group', () => {
    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('mainCoverage')).toBeDefined();
    expect(form.formGroup.get('glassCoverage')).toBeDefined();
    expect(form.formGroup.get('outsideCoverage')).toBeDefined();
  });
});
