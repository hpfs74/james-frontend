import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { Address } from '../../models/address';
import { AddressLookupService } from './address-lookup.service';
import { ConfigService } from '../../config.service';
import { GeolocationService } from '../../services/geolocation.service';
import { AddressLookupComponent } from './address-lookup.component';
import { UserDetailComponent } from './../knx-user-detail/user-detail.component';

describe('Component: AddressLookup', () => {
  let comp: AddressLookupComponent;
  let fixture: ComponentFixture<AddressLookupComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let formGroup: FormGroup;

  let addressServiceStub = {
    lookupAddress: (postalCode: string, houseNumber: string) => {
      return {
        street: 'Teststraat',
        number: '200'
      };
    }
  };

  let geoLocationServiceStub = {
  };

  let configServiceStub = {
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
      imports: [ HttpModule ],
      providers: [
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

  // xit('should get formGroup errors', () => {

  // });

  // xit('should get error messages', () => {

  // });

  // xit('should emit an address', () => {

  // });

  // xit('should get your current geolocation', () => {

  // });
});
