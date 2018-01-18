import { FormBuilder } from '@angular/forms';
import { HouseHoldLocationForm } from '@app/house-hold/containers/house-hold-location/house-hold-location.form';

describe('HouseHold Location Form', () => {
  let form: HouseHoldLocationForm;

  beforeEach(() => {
    const mockHouseHold = [
      { label: 'Alleen ikzelf', value: 'CHM' }
    ];
    form = new HouseHoldLocationForm(new FormBuilder(), mockHouseHold);
  });

  it('should have validation errors defined', () => {
    expect(Object.keys(form.validationErrors)).toEqual([
      'required',
      'maxlength'
    ]);
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should init the form group', () => {
    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('houseHold')).toBeDefined();
  });
});
