import { AuthService } from '../../auth/services/auth.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule, Response, ResponseOptions } from '@angular/http';
import { StoreModule, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { Address } from '../../profile/models/address';
import { AuthHttp  } from '../../auth/services';
import { LocalStorageService } from '../../core/services';
import { LoaderService } from '../knx-app-loader/loader.service';
import { AddressLookupComponent } from './address-lookup.component';
import { AddressLookupService } from './address-lookup.service';
import { AuthModule } from '../../auth/auth.module';

describe('Component: AddressLookup', () => {
  let comp: AddressLookupComponent;
  let fixture: ComponentFixture<AddressLookupComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let formGroup: FormGroup;

  const validationErrors = {
    required: () => 'Dit veld is verplicht',
    address: () => 'Error',
    postalCode: () => `Vul een geldige postcode`,
    houseNumber: () => `Vul een huisnummer in`
  };

  const testAddressObj = {
    'postcode': '2512CB',
    'number': '2',
    'street': 'Lutherse Burgwal',
    'city': 's-Gravenhage',
    'county': 's-Gravenhage',
    'province': 'Zuid-Holland',
    'fullname': 'Lutherse Burgwal 2 s-Gravenhage',
    'location': {
       'lat': 52.07535,
       'lng': 4.309771
    },
    'built': 1934,
    'house_size': 182,
    'house_value': 0,
    'house_info_roof_condition_text': 'Onbekend',
    'house_info_house_type_text': '',
    'house_info_house_use_text': 'residence',
    'number_extended': {
       'number_only': 2,
       'number_letter': '',
       'number_addition': '',
       'number_extension': ''
    },
    'rooms': 0,
    'build_type': '',
    'isolation_glass': false,
    'house_type': '',
    'house_subtype': null,
    'id': '2512CB2'
  };

  const addressServiceStub = {
    lookupAddress: (postalCode: string, houseNumber: string, houseNumberExtension: string) => {
      return Observable.of(testAddressObj);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, StoreModule.forRoot({})],
      providers: [
        AuthHttp,
        AuthService,
        LocalStorageService,
        {provide: LoaderService, useValue: {}},
        {provide: AddressLookupService, useValue: addressServiceStub},
      ],
      declarations: [AddressLookupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressLookupComponent);
    comp = fixture.componentInstance;

    const fb = new FormBuilder();
    comp.validationErrors = validationErrors;
    comp.addressFormGroup = fb.group({
      postalCode: [null, Validators.required],
      houseNumber: [null, Validators.required],
      houseNumberExtension: [null]
    });

    fixture.detectChanges();
  });

  describe('Form and service', () => {
    it('should initialize with a formGroup', () => {
      expect(comp.addressFormGroup).not.toBeNull();
    });

    it('should get error messages', () => {
      comp.validationErrors = validationErrors;
      expect(comp.getErrorMessage('address')).toEqual('Error');
    });

    it('should validate an address', () => {
      inject([AddressLookupService], (addressServiceStub) => {
        const isValid = comp.validateAddress(comp.addressFormGroup, addressServiceStub);
        expect(isValid).toBeUndefined();
      });
    });
  });

  describe('Async validator', () => {
    it('should return error object on empty form values', () => {
      inject([AddressLookupService], (addressServiceStub) => {
        const validatorResult = null;
        const validatorErrorResult = { address: true };

        let testObj = {
          validatorPromise: comp.validateAddress(comp.addressFormGroup, addressServiceStub)
        };
        let spy = spyOn(testObj, 'validatorPromise');

        testObj.validatorPromise.then(result => {
          expect(result).toEqual(validatorErrorResult);
        });
      });
    });

    it('should return null on valid form values', async(() => {
      inject([AddressLookupService], (addressServiceStub) => {
        const validatorResult = null;
        const validatorErrorResult = { address: true };

        comp.addressFormGroup.get('postalCode').setValue('2512CB');
        comp.addressFormGroup.get('houseNumber').setValue('22');

        let testObj = {
          validatorPromise: comp.validateAddress(comp.addressFormGroup, addressServiceStub)
        };
        let spy = spyOn(testObj, 'validatorPromise');

        testObj.validatorPromise.then(result => {
          expect(result).toEqual(validatorErrorResult);
        });
      });
    }));

    // it('should return error on empty form values', async(() => {
    //   comp.addressFormGroup.get('postalCode').setValue('');
    //   comp.addressFormGroup.get('houseNumber').setValue('');

    //   fixture.detectChanges();
    //   fixture.whenStable().then(() => {
    //     fixture.detectChanges();
    //     expect(comp.addressFormGroup.hasError('address')).toBe(true);
    //   });
    // }));

  });

});
