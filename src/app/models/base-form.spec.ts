import { BaseForm } from './base-form';

describe('Class: BaseForm', () => {
  let form = new BaseForm();

  describe('Helper for mobile number', () => {
    it('should return true on 0612345678', () => {
      expect(form.isMobileNumber('0612345678')).toBeTruthy();
    });

    it('should return true on 0612345678', () => {
      expect(form.isMobileNumber('0612345678')).toBeTruthy();
    });

    it('should return false on 06123456789', () => {
      expect(form.isMobileNumber('06123456789')).toBeFalsy();
    });

    it('should return false on 0203031680', () => {
      expect(form.isMobileNumber('0203031680')).toBeFalsy();
    });
  });
});
