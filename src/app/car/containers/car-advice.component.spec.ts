import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { CXFormsModule } from '@cx/forms';

import * as fromRoot from '../reducers';
import * as fromCore from '../../core/reducers';
import * as fromCar from '../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';

import * as router from '../../core/actions/router';
import * as layout from '../../core/actions/layout';
import * as assistant from '../../core/actions/assistant';

import * as profile from '../../profile/actions/profile';
import * as car from '../../car/actions/car';
import * as insurance from '../../insurance/actions/insurance';
import * as advice from '../../insurance/actions/advice';
import * as compare from '../../car/actions/compare';
import * as coverage from '../../car/actions/coverage';

import * as FormUtils from '../../utils/base-form.utils';
import { SharedModule } from '../../shared.module';
import { AddressModule } from '../../address/address.module';
import { CarAdviceComponent } from './car-advice.component';
import { CarExtrasForm } from '../components/advice/car-extras.form';
import { CarDetailForm } from '../components/advice/car-detail.form';
import { Car } from '../models/car';

describe('Component: CarAdviceComponent', () => {
  let comp: CarAdviceComponent;
  let fixture: ComponentFixture<CarAdviceComponent>;

  let actions: Observable<any>;
  let store: Store<fromCar.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CXFormsModule,
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'core': combineReducers(fromCore.reducers),
          'car': combineReducers(fromCar.reducers),
          'insurance': combineReducers(fromInsurance.reducers),
          'profile': combineReducers(fromProfile.reducers)
        })
      ],
      declarations: [
        CarAdviceComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAdviceComponent);
    comp = fixture.componentInstance;
    comp.ngOnInit();
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should bind a validator for license plate', () => {
      const ctrl = comp.carDetailForm.formGroup.get('licensePlate');
      expect(ctrl).toBeDefined();
      expect(ctrl.asyncValidator).toBeDefined();
    });

    it('should init child component forms', () => {
      expect(comp.carDetailForm).toBeDefined();
      expect(comp.carDetailForm.formGroup).toBeDefined();
      expect(comp.carExtrasForm).toBeDefined();
    });

    it('should init the wizard steps', () => {
      expect(comp.formSteps).toBeDefined();
      expect(comp.formSteps.length).toBeGreaterThan(0);

      comp.formSteps.forEach(step => {
        expect(step.label).toBeDefined();
        expect(step.onShowStep).toBeDefined();
      });
    });

    it('should init the form template', () => {
      const element = fixture.debugElement.query(By.css('form'));
      expect(element).toBeDefined();
      expect(comp).toBeDefined();
    });

    it('should have a CarExtraForm init with proper default values', () => {
      const carExtraForm = comp.carExtrasForm;

      expect(carExtraForm.formConfig.extraOptionsLegal).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsNoClaim).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsOccupants).toBeDefined();

      expect(carExtraForm.formConfig.roadAssistance).toBeDefined();
      expect(carExtraForm.formConfig.ownRisk).toBeDefined();
      expect(carExtraForm.formConfig.kmPerYear).toBeDefined();
    });

    it('should bind async validator for car info', () => {
      comp.ngAfterViewChecked();
      fixture.detectChanges();

      let licenseInput = comp.carDetailForm.formGroup.get('licensePlate');
      expect(licenseInput).toBeDefined();
      expect(licenseInput.validator.length).toBeGreaterThan(0);
    });
  });

  describe('Wizard', () => {
    it('should change the wizard step', () => {
      const step = 2;
      comp.onStepChange(step);
      expect(comp.currentStep).toEqual(step);
    });
  });

  describe('Side bar', () => {
    it('should toggle the side nav bar', () => {
      const open = true;
      const action = new layout.OpenLeftSideNav;
      comp.toggleSideNavState(open);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('Car Advice Flow', () => {
    it('should not go to next step on invalid details form', () => {

      comp.carDetailForm.formGroup.get('licensePlate').setValue('92HXK9');
      comp.carDetailForm.formGroup.get('loan').setValue(true);

      expect(comp.currentStep).toEqual(0);
      expect(comp.carDetailForm.formGroup.valid).toBeFalsy();

      const element = fixture.debugElement.query(By.css('.knx-car-advice--step-1 .knx-wizard__buttons .knx-button--primary'));
      if (element) {
        const button = element.nativeElement;
        button.click();
        fixture.detectChanges();
        expect(comp.currentStep).toEqual(0);
      }
    });

    it('should go to insurance result on valid details form', () => {
      comp.carDetailForm.formGroup.get('licensePlate').clearAsyncValidators();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        comp.carDetailForm.formGroup.get('licensePlate').setValue('01XLXL');
        comp.carDetailForm.formGroup.get('birthDate').setValue(new Date(1989, 11, 19));
        comp.carDetailForm.formGroup.get('claimFreeYears').setValue(1);
        comp.carDetailForm.formGroup.get('houseHold').setValue('CHM');
        comp.carDetailForm.formGroup.get('loan').setValue(false);
        comp.carDetailForm.formGroup.get('gender').setValue('M');
        comp.carDetailForm.formGroup.get('coverage').setValue('CL');

        comp.addressForm.formGroup.get('houseNumber').setValue('45');
        comp.addressForm.formGroup.get('postalCode').setValue('2518CB');

        comp.carDetailForm.formGroup.updateValueAndValidity();
        comp.addressForm.formGroup.updateValueAndValidity();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          console.warn(comp.carDetailForm.formGroup.get('licensePlate'));

          expect(comp.currentStep).toEqual(0);
          expect(comp.carDetailForm.formGroup.valid).toBeTruthy();
          expect(comp.addressForm.formGroup.valid).toBeTruthy();
          const element = fixture.debugElement.query(By.css('.knx-car-advice--step-1 .knx-wizard__buttons .knx-button--primary'));
          if (element) {
            const button = element.nativeElement;
            button.click();
            fixture.detectChanges();
            expect(comp.currentStep).toEqual(1);
          }
        });
      });
    });

    it('should dispatch a car compare action', async(() => {
      comp.carDetailForm.formGroup.get('licensePlate').clearAsyncValidators();

      const licensePlateValue = 'GK906T';
      const birthDateValue = new Date(1989, 11, 19);
      const claimFreeYearsValue = 1;
      const houseHoldvalue = 'CHM';
      const activeLoanValue = false;
      const genderValue = 'M';
      const titleValue = 'Dhr.';
      const coverageValue = 'CL';
      const postalCodeValue = '2518CB';
      const houseNumberValue = '45';
      const countryValue = 'NL';

      const address = {
        number: houseNumberValue,
        postcode: postalCodeValue,
        street: '',
        city: '',
        county: '',
        province: '',
        fullname: '',
        location: null
      };

      const action = new advice.UpdateAction(Object.assign({}, {
        active_loan: activeLoanValue,
        coverage: coverageValue,
        claim_free_years: claimFreeYearsValue,
        household_status: houseHoldvalue,
        license: licensePlateValue,
        gender: genderValue,
        title: titleValue,
        date_of_birth: '1989-12-19',
        zipcode: postalCodeValue,
        house_number: houseNumberValue,
        country: countryValue,
        kilometers_per_year: 'KMR3',
        own_risk: 0,
        cover_occupants: false,
        legal_aid: 'LAN',
        no_claim_protection: false,
        road_assistance: 'RANO',
        insurance_id: ''
      }, { address: address }));

      const car = {
        _id: 'GK906T',
        license: 'GK906T',
        vin: null,
        reporting_code: null,
        year: '2012',
        fuel: 'Benzine',
        fuel_code: 'B',
        secondary_fuel: null,
        color: 'zwart',
        color_code: null,
        secondary_color: null,
        secondary_color_code: null,
        weight_empty_vehicle: 1125,
        price_consumer_excl_vat: 29136,
        price_consumer_incl_vat: 34003,
        make: 'AUDI',
        model: 'A1',
        technical_type: '1.4 TFSI PRO LINE S',
        wheels: 4,
        top_speed: 203,
        engine_capacity: 1390,
        power_kw: 90,
        edition: '1.4 TFSI PRO LINE S',
        doors: 5,
        current_value: 16326,
        nicci_cartransmission_automatic_transmission: 'Automaat'
      } as Car;

      comp.address$ = Observable.of(address);
      comp.car$ = Observable.of(car);

      comp.carDetailForm.formGroup.get('licensePlate').setValue(licensePlateValue);
      comp.carDetailForm.formGroup.get('birthDate').setValue(birthDateValue);
      comp.carDetailForm.formGroup.get('claimFreeYears').setValue(claimFreeYearsValue);
      comp.carDetailForm.formGroup.get('houseHold').setValue(houseHoldvalue);
      comp.carDetailForm.formGroup.get('loan').setValue(activeLoanValue);
      comp.carDetailForm.formGroup.get('gender').setValue(genderValue);
      comp.carDetailForm.formGroup.get('coverage').setValue(coverageValue);

      comp.addressForm.formGroup.get('houseNumber').setValue(houseNumberValue);
      comp.addressForm.formGroup.get('postalCode').setValue(postalCodeValue);

      comp.carDetailForm.formGroup.updateValueAndValidity();
      comp.addressForm.formGroup.updateValueAndValidity();

      fixture.detectChanges();

      fixture.whenStable().then(() => {

        expect(comp.carDetailForm.formGroup.valid).toBeTruthy();
        expect(comp.addressForm.formGroup.valid).toBeTruthy();

        fixture.detectChanges();
        // Submit detail form
        let obs$ = comp.submitDetailForm();
        obs$.subscribe((res) => {
          expect(store.dispatch).toHaveBeenCalledWith(action);
        });
      });
    }));
  });

  describe('Car Info', () => {
    it('should load car info', async(() => {
      comp.carDetailForm.formGroup.get('licensePlate').setValue('01XLXL');
      fixture.whenStable().then(() => {
        const carInfoEl = fixture.debugElement.query(By.css('.knx-car-info-message'));
        expect(carInfoEl).toBeDefined();
      });
    }));
  });

  describe('Coverage Recommendation', () => {
    it('should show no coverage recommendation by default', () => {
      const recommendedPriceItem = fixture.debugElement.query(By.css('.knx-price-item__badge'));
      expect(recommendedPriceItem).toBeNull();
    });

    it('should load the coverage recommendation', async(() => {
      comp.carDetailForm.formGroup.get('licensePlate').setValue('01XLXL');
      comp.carDetailForm.formGroup.get('loan').setValue(false);

      fixture.whenStable().then(() => {
        const recommendedPriceItem = fixture.debugElement.query(By.css('.knx-price-item__badge'));
        expect(recommendedPriceItem).toBeDefined();
      });
    }));
  });

  describe('Car Result Flow', () => {
    it('should dispatch when premium is selected', () => {
      const insurance = {
        id: '2516227',
        insurance_id: 'ohra-autoverzekering-aanvullend',
        moneyview_id: 'ohra-autoverzekering-aanvullend',
        type: 'car',
        car: null,
        insurance_name: 'Auto',
        fit: 78.09,
        price_quality: 10,
        own_risk: 0,
        monthly_premium: 121.99,
        documents: [],
        details: 'WAVC',
        price: 121.99,
        product_id: '2516227',
        terms_conditions_pdf_url: '',
        reviews: 2,
        reviews_amount: 4,
        supported: true,
        _embedded: null
      };
      const action = new advice.SetInsuranceAction(insurance);
      comp.onSelectPremium(insurance);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

});
