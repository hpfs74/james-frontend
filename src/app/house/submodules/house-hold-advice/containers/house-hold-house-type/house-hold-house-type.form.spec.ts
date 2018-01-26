import { FormBuilder } from '@angular/forms';
import { HouseHoldHouseTypeForm } from '@app/house/containers/house-hold-house-type/house-hold-house-type.form';

describe('HouseHold Type Form', () => {
  let form: HouseHoldHouseTypeForm;

  beforeEach(() => {
    const mockHouseHold = [
      { label: 'Alleen ikzelf', value: 'CHM' }
    ];
    form = new HouseHoldHouseTypeForm(new FormBuilder(), mockHouseHold);
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
    expect(form.formGroup.get('roomsCount')).toBeDefined();
    expect(form.formGroup.get('surfaceArea')).toBeDefined();
    expect(form.formGroup.get('buildingType')).toBeDefined();
    expect(form.formGroup.get('buildYear')).toBeDefined();
  });
});
