import { AuthService } from './../../services/auth.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule, Response, ResponseOptions } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { Address } from '../../models/address';
import { ConfigService } from '../../config.service';
import { AuthHttp, GeolocationService } from '../../services';
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
    address: () => 'Error'
  };

  const addressServiceStub = {
    lookupAddress: (postalCode: string, houseNumber: string, houseNumberExtension: string) => {
      let ret = new Response(
        new ResponseOptions({
          body: [
            { street: 'streetname', city: 'cityname' }
          ]
        }));

      return Observable.of(ret);
    }
  };

  const geoLocationServiceStub = {
  };

  const configServiceStub = {
    config: {
      api: {
        james: {
          address: ''
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  HttpModule ],
      providers: [
        AuthHttp,
        AuthService,
        { provide: AddressLookupService, useValue: addressServiceStub },
        { provide: GeolocationService, useValue: geoLocationServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ],
      declarations: [AddressLookupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressLookupComponent);
    comp = fixture.componentInstance;

    let fb = new FormBuilder();
    comp.addressFormGroup = fb.group({
      postalCode: [null, Validators.required ],
      houseNumber: [null, Validators.required],
      houseNumberExtension: [null]
    });

    fixture.detectChanges();
  });

  it('should initialize with a formGroup', () => {
    expect(comp.addressFormGroup).not.toBeNull;
  });

  it('should get formGroup errors', () => {
    Object.keys(comp.addressFormGroup.controls).forEach(key => {
      comp.addressFormGroup.get(key).markAsTouched();
    });
    comp.addressFormGroup.markAsTouched();

    fixture.detectChanges();

    expect(comp.addressFormGroup.errors).not.toBeNull;

    let errors = comp.getErrors();
    expect(errors).toBeDefined;
  });

  it('should get error messages', () => {
    comp.validationErrors = validationErrors;
    expect(comp.getErrorMessage('address')).toEqual('Error');
  });

  it('should validate an address', () => {
      inject([AddressLookupService], (addressServiceStub) => {
        let isValid = comp.validateAddress(comp.addressFormGroup, addressServiceStub);
        expect(isValid).toBeUndefined;
      });
  });

  it('should emit an addressFound', (done) => {

    inject([AddressLookupService], (addressServiceStub) => {
      comp.addressFound.subscribe((data) => {
        expect(data).not.toBeNull;
        expect(data.street).not.toBe('streetname');
        expect(data.city).not.toBe('cityname');

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

  xit('should get your current geolocation', () => {
    //TO BE IMPLEMENTED
  });
});
