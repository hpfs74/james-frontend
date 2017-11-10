import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreModule, Store, State, ActionReducer, combineReducers } from '@ngrx/store';

import { setUpTestBed } from './../../../test.common.spec';

// Components
import { CarContactComponent } from '../components/buy/car-contact.component';
import { CarSummaryComponent } from '../components/buy/car-summary.component';
import { CarReportingCodeComponent } from '../components/buy/car-reporting-code.component';
import { CarCheckComponent } from '../components/buy/car-check.component';
import { CarCheckForm } from '../components/buy/car-check.form';
import { CarPaymentComponent } from '../components/buy/car-payment.component';
import { CarBuyComponent } from './car-buy.component';

import * as fromRoot from '../reducers';
import * as fromCore from '../../core/reducers';
import * as fromCar from '../reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromProfile from '../../profile/reducers';

import * as car from '../actions/car';
import * as advice from '../../insurance/actions/advice';
import * as compare from '../actions/compare';
import * as router from '../../core/actions/router';

import { SharedModule } from '../../shared.module';
import { TagsService } from '../../core/services/tags.service';
import { TagsServiceMock } from '../../core/services/tags.service.mock.spec';

import { BuyCompleteAction, BuyFailureAction } from '../actions/car';
import { Profile } from '../../profile/models/profile';


export function getInitialState() {
  return {
    'core': {
      assistant: {
        config: {
          avatar: {
            name: 'Test',
            title: 'Expert'
          },
          dashboard: null,
          profile: null,
          car: null,
        }
      }
    }
  };
}

export function getMockedInsuranceProposal() {
  return {
    profileInfo: {
      name: 'asdasd',
      firstName: 'first name',
      lastName: 'last name',
      gender: 'M',
      initials: 'R.R',
      date_of_birth: new Date(12, 11, 1975),
      iban: 'asdkasd',
      emailaddress: 'mail@domain.com'
    },
    adviceInfo: {
      startDate: '12-12-2017',
      address: {
        street: 'aaaa',
        house_number: '1234',
        number_extended: '123',
        zipcode: '23124',
        city: 'den haag'
      },
      acccessoryValue: 1234,
      kilometers_per_year: 1234,
      securityClass: ['asbc'],
      coverage: 'CL',
      legal: true,
      cover_occupants: true
    },
    insuranceInfo: {
      _embedded: {
        insurance: {
          moneyview_id: 'abc:abc'
        }
      }
    },
    carInfo: {
      car: {
        license: '123',
        make: 'AAA',
        model: 'AAAA',
        technical_type: 'AAAA',
        year: 2015,
        price_consumer_incl_vat: 12345,
        current_value: 11333,
        weight_empty_vehicle: 1234
      }
    }
  };
}


describe('Component: CarBuyComponent', () => {
  let comp: CarBuyComponent;
  let fixture: ComponentFixture<CarBuyComponent>;
  let store: Store<fromAuth.State>;
  let tagsService: TagsService;

  let moduleDef: TestModuleMetadata = {
    imports: [
      BrowserAnimationsModule,
      SharedModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'core': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      }, {
        initialState: getInitialState
      })
    ],
    declarations: [
      CarBuyComponent,
      CarSummaryComponent,
      CarPaymentComponent,
      CarContactComponent,
      CarReportingCodeComponent,
      CarCheckComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      CurrencyPipe,
      {
        provide: TagsService,
        useValue: TagsServiceMock
      },
      {
        provide: Router,
        useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      }]
  };
  setUpTestBed(moduleDef);

  beforeAll(() => {
    tagsService = TestBed.get(TagsService);
    tagsService.load();
  });

  beforeEach(async(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBuyComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init all the forms', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp).toBeDefined();
    expect(comp.contactDetailForm).toBeDefined();
    expect(comp.reportingCodeForm).toBeDefined();
    expect(comp.checkForm).toBeDefined();
    expect(comp.paymentForm).toBeDefined();
  });

  it('should update the step counter', () => {
    comp.onStepChange(4);
    expect(comp.currentStep).toEqual(4);
  });

  it('should validate the form before next step', () => {
    comp.contactDetailForm.formGroup.get('initials').setValue('A');
    comp.contactDetailForm.formGroup.get('middleName').setValue('A');
    comp.contactDetailForm.formGroup.get('firstName').setValue('A');
    comp.contactDetailForm.formGroup.get('lastName').setValue('A');
    comp.contactDetailForm.formGroup.get('mobileNumber').setValue('0612345678');
    comp.contactDetailForm.formGroup.get('phoneNumber').setValue('0613822660');
    expect(comp.formSteps[0].onBeforeNext() instanceof Observable).toBeTruthy();
  });

  describe('getUpdatedProfile()', () => {
    it('should populate profile data properly', () => {
      comp.contactDetailForm.formGroup.get('initials').setValue('F.L.');
      comp.contactDetailForm.formGroup.get('middleName').setValue('Middle name');
      comp.contactDetailForm.formGroup.get('firstName').setValue('First name');
      comp.contactDetailForm.formGroup.get('lastName').setValue('Last name');
      comp.contactDetailForm.formGroup.get('mobileNumber').setValue('0666666666');
      comp.contactDetailForm.formGroup.get('phoneNumber').setValue('070777777');

      let obj = comp.getUpdatedProfile(comp.contactDetailForm.formGroup);

      expect(obj.firstName).toBe('First name');
      expect(obj.lastName).toBe('Last name');
      expect(obj.infix).toBe('Middle name');
      expect(obj.initials).toBe('F.L.');
      expect(obj.mobileNumber).toBe('0666666666');
      expect(obj.phoneNumber).toBe('070777777');
    });
  });

  describe('getProposalData()', () => {
    it('should populate flat data properly', () => {
      let value = getMockedInsuranceProposal();

      comp.contactDetailForm.formGroup.get('initials').setValue('F.L.');
      comp.contactDetailForm.formGroup.get('middleName').setValue('Middle name');
      comp.contactDetailForm.formGroup.get('firstName').setValue('First name');
      comp.contactDetailForm.formGroup.get('lastName').setValue('Last name');
      comp.contactDetailForm.formGroup.get('mobileNumber').setValue('0666666666');
      comp.contactDetailForm.formGroup.get('phoneNumber').setValue('070777777');

      let result = comp.getProposalData(value, comp.contactDetailForm.formGroup);

      expect(result).toBeDefined();
    });
  });

  describe('resetFlow()', () => {
    it('should dispatch reset acitons', () => {
      let adviceResetAction = new advice.ResetAction();
      let compareResetAction = new compare.CarCompareResetStateAction();
      let carResetAction = new car.CarResetStateAction();
      let routerBackAction = new router.Go({path: ['car']});
      comp.resetFlow();
      expect(store.dispatch).toHaveBeenCalledWith(adviceResetAction);
      expect(store.dispatch).toHaveBeenCalledWith(compareResetAction);
      expect(store.dispatch).toHaveBeenCalledWith(carResetAction);
      expect(store.dispatch).toHaveBeenCalledWith(routerBackAction);
    });
  });

  describe('submitInsurace()', () => {

    it('should return an error if conditions are not accepted', async(() => {
      comp.acceptFinalTerms = false;
      fixture.detectChanges();

      let res = comp
        .submitInsurance()
        .subscribe(
          data => {
          },
          err => {
            expect(err).toBeDefined();
            expect(err.message).toBe('Je hebt de gebruikersvoorwaarden nog niet geaccepteerd');
          }
        );
    }));

    it('should return an error on buyErrorAction', async(() => {
      let data = getMockedInsuranceProposal();
      comp.car$ = Observable.of(data.carInfo);
      comp.insurance$ = Observable.of(data.insuranceInfo);
      comp.profile$ = Observable.of(Object.assign(new Profile(), data.profileInfo));
      comp.advice$ = Observable.of(data.adviceInfo);
      comp.acceptFinalTerms = true;
      store.dispatch(new BuyFailureAction(new Error()));

      fixture.detectChanges();

      let res = comp
        .submitInsurance()
        .subscribe(data => {

            expect(false).toBeTruthy('Should not pass here');
          },
          err => {
            expect(err).toBeDefined();
            expect(err.message).toBe('Er is helaas iets mis gegaan. Probeer het later opnieuw.');
          }
        );
    }));

    it('should route to thankYouPage on success', async(() => {
      let data = getMockedInsuranceProposal();
      comp.car$ = Observable.of(data.carInfo);
      comp.insurance$ = Observable.of(data.insuranceInfo);
      comp.profile$ = Observable.of(Object.assign(new Profile(), data.profileInfo));
      comp.advice$ = Observable.of(data.adviceInfo);
      comp.acceptFinalTerms = true;
      store.dispatch(new BuyCompleteAction({}));

      let expectedAction = new router.Go({path: ['/car/thank-you', data.profileInfo.emailaddress]});
      fixture.detectChanges();

      let res = comp
        .submitInsurance()
        .subscribe(
          () => expect(true).toBeTruthy(),
          () => expect(false).toBeTruthy('Should not pass here'),
          // () => expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
        );
    }));
  });
});
