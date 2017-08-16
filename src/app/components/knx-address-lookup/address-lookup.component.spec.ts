import { AuthService } from './../../services/auth.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule, Response, ResponseOptions } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { Address } from '../../models/address';
import { AuthHttp, GeolocationService } from '../../services';
import { LoaderService } from '../knx-app-loader/loader.service';
import { AddressLookupComponent } from './address-lookup.component';
import { AddressLookupService } from './address-lookup.service';
import { AuthModule } from '../../auth.module';

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

  const addressServiceStub = {
    lookupAddress: (postalCode: string, houseNumber: string, houseNumberExtension: string) => {
      const ret = new Response(
        new ResponseOptions({
          body: [{
              street: 'streetname',
              city: 'cityname',
              Output: 'streetname in the city'
            }]
        }));

      return Observable.of(ret);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  HttpModule ],
      providers: [
        AuthHttp,
        AuthService,
        { provide: LoaderService, useValue: {}},
        { provide: AddressLookupService, useValue: addressServiceStub },
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

  it('should initialize with a formGroup', () => {
    expect(comp.addressFormGroup).not.toBeNull();
  });

  // TODO: fix
  // it('should get formGroup errors', () => {
  //   Object.keys(comp.addressFormGroup.controls).forEach(key => {
  //     comp.addressFormGroup.get(key).markAsTouched();
  //   });
  //   comp.addressFormGroup.markAsTouched();

  //   fixture.detectChanges();

  //   expect(comp.addressFormGroup.errors).not.toBeNull();

  //   // const errors = comp.getErrors();
  //   // expect(errors).toBeDefined();
  // });

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

  xit('should get address', (done) => {

    inject([AddressLookupService], (addressServiceStub) => {
      comp.addressFound.subscribe((data) => {
        expect(data).not.toBeNull();
        // expect(data.street).not.toBe('streetname');
        // expect(data.city).not.toBe('cityname');

        done();
      });

      comp.addressFormGroup.controls['postalCode']
        .setValue('2273DE');
      comp.addressFormGroup.controls['houseNumber']
        .setValue('220');

      fixture.detectChanges();

      comp.validateAddress(comp.addressFormGroup, addressServiceStub);
    })();
  });
});
