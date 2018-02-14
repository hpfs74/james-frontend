import { FormBuilder } from '@angular/forms';
import { HouseHoldHouseTypeForm } from './house-hold-house-type.form';

describe('HouseHold Type Form', () => {
  let form: HouseHoldHouseTypeForm;

  beforeEach(() => {
    const mockRoomsCount = [
      {label: '2', value: '2'},
      {label: '3', value: '3'}
    ];
    const mockSurfaceArea = [{label: '90', value: '90'}];
    const mockBuildingType = [{label: 'A', value: 'A'}];
    const mockBuildYear = [{label: '1800', value: '1800'}];

    form = new HouseHoldHouseTypeForm(new FormBuilder(),
      mockRoomsCount,
      mockSurfaceArea,
      mockBuildingType,
      mockBuildYear);
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

  it('should have proper default value', () => {
    expect(form.formGroup.get('roomsCount').value).toBe(null);
    expect(form.formGroup.get('surfaceArea').value).toBe(null);
    expect(form.formGroup.get('buildingType').value).toBe(null);
    expect(form.formGroup.get('buildYear').value).toBe(null);
  });
});
