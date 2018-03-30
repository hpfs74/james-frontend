import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import * as CustomValidators from './base-form.validators';

describe('Custom Validators', () => {
  describe('maxNumberValidator', () => {
    it('should return error obj on value bigger than max', () => {
      expect(CustomValidators.maxNumberValidator('myCtrl', 20)(new FormControl('25')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on valid value', () => {
      expect(CustomValidators.maxNumberValidator('myCtrl', 20)(new FormControl('5')))
        .toBeNull();
    });

    it('should return null on max value', () => {
      expect(CustomValidators.maxNumberValidator('myCtrl', 20)(new FormControl('20')))
        .toBeNull();
    });
  });

  describe('minNumberValidator', () => {
    it('should return error obj on value smaller than min', () => {
      expect(CustomValidators.minNumberValidator('myCtrl', 10)(new FormControl('5')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on valid value', () => {
      expect(CustomValidators.minNumberValidator('myCtrl', 10)(new FormControl('15')))
        .toBeNull();
    });

    it('should return null on min value', () => {
      expect(CustomValidators.minNumberValidator('myCtrl', 10)(new FormControl('10')))
        .toBeNull();
    });
  });

  describe('numberValidator', () => {
    it('should return error on string value', () => {
      expect(CustomValidators.numberValidator('myCtrl')(new FormControl('hello world')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on special chars', () => {
      expect(CustomValidators.numberValidator('myCtrl')(new FormControl('@%%#$#')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on floating point', () => {
      expect(CustomValidators.numberValidator('myCtrl')(new FormControl('23.54')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on negative number', () => {
      expect(CustomValidators.numberValidator('myCtrl')(new FormControl('-30')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on number', () => {
      expect(CustomValidators.numberValidator('myCtrl')(new FormControl('15')))
        .toBeNull();
    });
  });

  describe('dateValidator', () => {
    it('should return error on string value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('hello world')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on number value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('323')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on date value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('22/05/2001')))
        .toBeNull();
    });
  });

  describe('futureDateValidator', () => {
    it('should return error on string value', () => {
      expect(CustomValidators.futureDateValidator('myCtrl')(new FormControl('hello world')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on number value', () => {
      expect(CustomValidators.futureDateValidator('myCtrl')(new FormControl('323')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on future date value', () => {
      const currentDate = new Date();
      const testDate = currentDate.setFullYear(currentDate.getFullYear() + 1);
      const date = moment(testDate).format('DD/MM/YYYY');
      expect(CustomValidators.futureDateValidator('myCtrl')(new FormControl(date)))
        .toBeNull();
    });

    it('should return error on past date value', () => {
      expect(CustomValidators.futureDateValidator('myCtrl')(new FormControl('22/05/2000')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on future greater than 90 using limit', () => {
      const currentDate = new Date();
      const testDate = currentDate.setFullYear(currentDate.getFullYear() + 1);
      const date = moment(testDate).format('DD/MM/YYYY');
      expect(CustomValidators.futureDateValidator('myCtrl', 90)(new FormControl(date)))
        .toEqual({'myCtrl': true});
    });
  });

  describe('maxDateValidator', () => {
    it('should return error on string value', () => {
      expect(CustomValidators.maxDateValidator('myCtrl', 2)(new FormControl('hello world')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on number value', () => {
      expect(CustomValidators.maxDateValidator('myCtrl', 2)(new FormControl('323')))
        .toEqual({'myCtrl': true});
    });

    it('should return null on date value in max limit', () => {
      // add one year in the future
      const currentDate = new Date();
      const testDate = currentDate.setFullYear(currentDate.getFullYear() + 1);
      const date = moment(testDate).format('DD/MM/YYYY');
      expect(CustomValidators.maxDateValidator('myCtrl', 24)(new FormControl(date)))
        .toBeNull();
    });

    it('should return error on date value past max limit', () => {
      // add three years in the future
      const currentDate = new Date();
      const testDate = currentDate.setFullYear(currentDate.getFullYear() + 3);
      const date = moment(testDate).format('DD/MM/YYYY');
      expect(CustomValidators.maxDateValidator('myCtrl', 24)(new FormControl(date)))
        .toEqual({'myCtrl': true});
    });
  });

  describe('birthDateValidator', () => {
    it('should return error on string value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('hello world')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on number value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('323')))
        .toEqual({'myCtrl': true});
    });

    it('should return error on invalid date value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('22/05/1200')))
        .toBeNull();
    });

    it('should return null on date value', () => {
      expect(CustomValidators.dateValidator('myCtrl')(new FormControl('22/05/2001')))
        .toBeNull();
    });
  });

  describe('regExValidator', () => {
    it('should return error on unmatched value (email)', () => {
      expect(CustomValidators.regExValidator(/^[^@]+@[a-zA-Z0-9.\-]+$/, 'myCtrl')
      (new FormControl('hello world'))).toEqual({'myCtrl': true});
    });

    it('should return null on matched value (email)', () => {
      expect(CustomValidators.regExValidator(/^[^@]+@[a-zA-Z0-9.\-]+$/, 'myCtrl')
      (new FormControl('test@mail.com'))).toBeNull();
    });
  });

  describe('phoneNumberValidator', () => {
    it('should return error on string value', () => {
      expect(CustomValidators.phoneNumberValidator('myCtrl')
      (new FormControl('hello world'))).toEqual({'myCtrl': true});
    });

    it('should return null on short number value', () => {
      expect(CustomValidators.phoneNumberValidator('myCtrl')
      (new FormControl('123'))).toBeNull();
    });

    it('should return null on phone value', () => {
      expect(CustomValidators.phoneNumberValidator('myCtrl')
      (new FormControl('0612345678'))).toBeNull();

      expect(CustomValidators.phoneNumberValidator('myCtrl')
      (new FormControl('+0703456789'))).toBeNull();
    });
  });

  describe('emptyOrPhoneNumberValidator', () => {
    it('should return error on not valid number', () => {
      expect(CustomValidators.emptyOrPhoneNumberValidator('myCtrl')
      (new FormControl('hello world'))).toEqual({'myCtrl': true});
    });

    it('should return null on empty string', () => {
      expect(CustomValidators.emptyOrPhoneNumberValidator('myCtrl')
      (new FormControl(''))).toBeNull();
    });
    it('should return null on right phone number', () => {
      expect(CustomValidators.emptyOrPhoneNumberValidator('myCtrl')
      (new FormControl('0612345678'))).toBeNull();
    });

    it('should return error on short phone number', () => {
      expect(CustomValidators.emptyOrPhoneNumberValidator('myCtrl')
      (new FormControl('061234'))).toEqual({'myCtrl': true});
    });
  });
});
