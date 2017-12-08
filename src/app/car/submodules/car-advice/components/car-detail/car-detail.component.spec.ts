import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { KNXLocale } from '@knx/locale';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { setUpTestBed } from './../../../../../../test.common.spec';

import { SharedModule } from '../../../../../shared.module';
import { Address } from '../../../../../address/models';
import { CarDetailForm } from './car-detail.form';
import { CarDetailComponent } from './car-detail.component';
import { CarService } from '../../../../services/car.service';
import { AuthHttp, AuthService } from '../../../../../auth/services';
import { LocalStorageService } from '../../../../../core/services/localstorage.service';
import { LoaderService } from '../../../../../components/knx-app-loader/loader.service';
import { AddressForm } from '../../../../../address/components/address.form';
import { TagsService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { StoreModule, Store, combineReducers } from '@ngrx/store';


import * as fromRoot from '../../../../reducers';
import * as fromCore from '../../../../../core/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromProfile from '../../../../../profile/reducers';

import * as router from '../../../../../core/actions/router';
import * as layout from '../../../../../core/actions/layout';
import * as assistant from '../../../../../core/actions/assistant';

import * as profile from '../../../../../profile/actions/profile';
import * as car from '../../../../../car/actions/car';
import * as insurance from '../../../../../insurance/actions/insurance';
import * as advice from '../../../../../insurance/actions/advice';
import * as compare from '../../../../../car/actions/compare';
import * as coverage from '../../../../../car/actions/coverage';

describe('Component: CarDetailComponent', () => {
  let comp: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let store: Store<fromRoot.State>;
  let tagsService: TagsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'app': combineReducers(fromCore.reducers),
          'car': combineReducers(fromCar.reducers),
          'insurance': combineReducers(fromInsurance.reducers),
          'profile': combineReducers(fromProfile.reducers)
        })
      ],
      declarations: [
        CarDetailComponent
      ],
      providers: [
        KNXLocale,
        {
          provide: TagsService,
          useValue: TagsServiceMock
        },
        {
          provide: ContentConfig,
          useValue: ContentConfigMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    tagsService = TestBed.get(TagsService);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(CarDetailComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp).toBeDefined();
    expect(comp.form).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.form.formGroup.valid).toBeFalsy();
  });

  // it('should have default value for loan', () => {
  //   expect(comp.form.formGroup.get('loan').valid).toBeTruthy();
  // });

  it('should contain carinfo licenseplate component', () => {
    const element = fixture.debugElement.query(By.css('knx-input-licenseplate > div > input'));
    expect(element).toBeDefined();
  });

  it('should not display car info if license plate is invalid', () => {
    const element = fixture.debugElement.query(By.css('knx-input-licenseplate > div > input'));
    expect(element).toBeDefined();
    comp.form.formGroup.get('licensePlate').setValue('abc');
    fixture.detectChanges();

    expect(comp.form.formGroup.get('licensePlate').valid).toBeFalsy();

    const elementCarInfo = fixture.debugElement.query(By.css('knx-car-info-message'));
    expect(elementCarInfo).toBeNull();
  });

  // it('should only emit a valid active loan', () => {
  //   spyOn(comp.activeLoanChange, 'emit');

  //   let nativeElement = fixture.nativeElement;
  //   let loanCtrl = comp.targetComponent.form.formGroup.get('loan');
  //   loanCtrl.setValue(true);

  //   fixture.detectChanges();

  //   expect(comp.targetComponent.activeLoanChange.emit).toHaveBeenCalledWith(true);
  // });

  // it('should emit a form control key', () => {
  //   const id = 'my.test.key';
  //   spyOn(comp.targetComponent.formControlFocus, 'emit');
  //   comp.targetComponent.onFocus(id);
  //   fixture.detectChanges();
  //   expect(comp.targetComponent.formControlFocus.emit).toHaveBeenCalledWith(id);
  // });

  // it('should emit a selected coverage', () => {
  //   spyOn(comp.targetComponent.coverageSelected, 'emit');
  //   const coverageItem = {
  //     id: 'testId',
  //     header: 'this is a price item',
  //     badge: '',
  //     features: []
  //   };
  //   comp.targetComponent.onSelectCoverage(coverageItem);
  //   fixture.detectChanges();

  //   expect(comp.targetComponent.coverageSelected.emit).toHaveBeenCalledWith(coverageItem);
  // });

  // it('should emit an address', () => {
  //   const address = {
  //     _id: '2132JK25',
  //     postcode: '2132JK',
  //     number: '25',
  //     street: 'Capellalaan',
  //     city: 'Hoofddorp',
  //     county: 'haarlemmermeer',
  //     province: 'noord_holland',
  //     fullname: 'Capellalaan 25 2132JK Hoofddorp',
  //     location: {
  //       lat: 52.293848662962866,
  //       lng: 4.705527419663116
  //     }
  //   } as Address;
  //   spyOn(comp.targetComponent.addressChange, 'emit');
  //   comp.targetComponent.onAddressFound(address);
  //   fixture.detectChanges();
  //   expect(comp.targetComponent.addressChange.emit).toHaveBeenCalledWith(address);
  // });


  // describe('bugs', () => {
  //   it('should handle simple number', () => {
  //     let value = {
  //       address: {
  //         postcode: '1016LC',
  //         number: '30'
  //       },
  //       number_extended: {
  //         number_addition: null
  //       }
  //     };

  //     comp.targetComponent.advice = value;
  //     fixture.detectChanges();

  //     const postalCodeCtrl = comp.targetComponent.addressForm.formGroup.get('postalCode');
  //     const houseNumberCtrl = comp.targetComponent.addressForm.formGroup.get('houseNumber');
  //     const houseNumberExtensionCtrl = comp.targetComponent.addressForm.formGroup.get('houseNumberExtension');

  //     expect(postalCodeCtrl.value).toBe('1016LC');
  //     expect(houseNumberCtrl.value).toContain('30');
  //     expect(houseNumberExtensionCtrl.value).toBe('');
  //   });

  //   it('should handle spinozalaan bug :)', () => {

  //     let value = {
  //       address: {
  //         postcode: '2273XA',
  //         number: '1A-1'
  //       },
  //       number_extended: {
  //         number_addition: null
  //       }
  //     };

  //     comp.targetComponent.advice = value;
  //     fixture.detectChanges();

  //     const postalCodeCtrl = comp.targetComponent.addressForm.formGroup.get('postalCode');
  //     const houseNumberCtrl = comp.targetComponent.addressForm.formGroup.get('houseNumber');
  //     const houseNumberExtensionCtrl = comp.targetComponent.addressForm.formGroup.get('houseNumberExtension');

  //     expect(postalCodeCtrl.value).toBe('2273XA');
  //     expect(houseNumberCtrl.value).toContain('1');
  //     expect(houseNumberExtensionCtrl.value).toBe('A-1');
  //   });
  // });
});
