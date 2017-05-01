import { FormControl } from '@angular/forms';
import { LicensePlateValidator } from './licenseplate.validator';

describe('Component: License Plate', () => {

  describe('LicensePlateValidator', () => {

    it('should validate correct license plates', () => {

      expect(LicensePlateValidator({
        value: ''
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: 'XX9999'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: '9999XX'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: '99XX99'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: 'XX99XX'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: 'XXXX99'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: '99XXXX'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: '99XXX9'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: '9XXX99'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: 'XX999X'
      } as FormControl)).toBe(null);

      expect(LicensePlateValidator({
        value: 'X999XX'
      } as FormControl)).toBe(null);
    });

    it('should reject invalid license plates', () => {

      // value is transformed without dashes, so anything
      // with a dash should be rejected
      expect(LicensePlateValidator({
        value: '99-99-XX'
      } as FormControl)).toEqual({
        licensePlate: true
      });

      // too short
      expect(LicensePlateValidator({
        value: '9'
      } as FormControl)).toEqual({
        licensePlate: true
      });

      // too long
      expect(LicensePlateValidator({
        value: 'XX9999-'
      } as FormControl)).toEqual({
        licensePlate: true
      });

      // invalid character
      expect(LicensePlateValidator({
        value: '=XX99'
      } as FormControl)).toEqual({
        licensePlate: true
      });

    });
  });

});
