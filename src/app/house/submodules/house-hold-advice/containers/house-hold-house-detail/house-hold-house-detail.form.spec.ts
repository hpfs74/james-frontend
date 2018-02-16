import { FormBuilder } from '@angular/forms';
import { HouseHoldHouseDetailForm } from './house-hold-house-detail.form';


describe('HouseHold Detail Form', () => {
  let form: HouseHoldHouseDetailForm;

  beforeEach(() => {
    const mockHouseHold = [];
    form = new HouseHoldHouseDetailForm(new FormBuilder(),
      mockHouseHold,
      mockHouseHold,
      mockHouseHold,
      mockHouseHold);
  });

  it('should have form options defined', () => {
    expect(form.formConfig).toBeDefined();
  });

  it('should init the form group', () => {
    expect(form.formGroup).toBeDefined();
    expect(form.formGroup.get('wallsTitle')).toBeDefined();
    expect(form.formGroup.get('roofMaterial')).toBeDefined();
    expect(form.formGroup.get('secondFloor')).toBeDefined();
    expect(form.formGroup.get('security')).toBeDefined();
  });
});
