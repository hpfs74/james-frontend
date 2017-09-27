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

import { SharedModule } from '../../shared.module';
import { AddressModule } from '../../address/address.module';
import { ContentService } from '../../content.service';
import { CarAdviceComponent } from './car-advice.component';
import { CarExtrasForm } from '../components/advice/car-extras.form';
import { CarDetailForm } from '../components/advice/car-detail.form';

@Component({
  template: `<div><knx-car-advice></knx-car-advice></div>`
})
export class TestHostComponent {
  @ViewChild(CarAdviceComponent)
  public targetComponent: CarAdviceComponent;
  public formFromHost: CarDetailForm = new CarDetailForm(new FormBuilder());
}

describe('Component: CarAdviceComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

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
        CarAdviceComponent,
        TestHostComponent
      ],
      providers: [
        {
          provide: ContentService,
          useValue: jasmine.createSpyObj('ContentService', {
            'getContentObject': {
              car: {}
            }
          })
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should bind a validator for license plate', () => {
      const ctrl = comp.targetComponent.carDetailForm.formGroup.get('licensePlate');
      expect(ctrl).toBeDefined();
      expect(ctrl.asyncValidator).toBeDefined();
    });

    it('should init child component forms', () => {
      expect(comp.targetComponent.carDetailForm).toBeDefined();
      expect(comp.targetComponent.carDetailForm.formGroup).toBeDefined();
      expect(comp.targetComponent.carDetailForm.addressForm).toBeDefined();
      expect(comp.targetComponent.carExtrasForm).toBeDefined();
    });

    it('should init the wizard steps', () => {
      expect(comp.targetComponent.formSteps).toBeDefined();
      expect(comp.targetComponent.formSteps.length).toBeGreaterThan(0);

      comp.targetComponent.formSteps.forEach(step => {
        expect(step.label).toBeDefined();
        expect(step.onShowStep).toBeDefined();
      });
    });

    it('should init the form template', () => {
      const element = fixture.debugElement.query(By.css('form'));
      expect(element).toBeDefined();
      expect(comp.targetComponent).toBeDefined();
    });

    it('should have a CarExtraForm init with proper default values', () => {
      const carExtraForm = comp.targetComponent.carExtrasForm;

      expect(carExtraForm.formConfig.extraOptionsLegal).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsNoClaim).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsOccupants).toBeDefined();

      expect(carExtraForm.formConfig.roadAssistance).toBeDefined();
      expect(carExtraForm.formConfig.ownRisk).toBeDefined();
      expect(carExtraForm.formConfig.kmPerYear).toBeDefined();
    });

    it('should bind async validator for car info', () => {
      comp.targetComponent.ngAfterViewChecked();
      fixture.detectChanges();

      let licenseInput = comp.targetComponent.carDetailForm.formGroup.get('licensePlate');
      expect(licenseInput).toBeDefined();
      expect(licenseInput.validator.length).toBeGreaterThan(0);
    });
  });

  describe('Car Advice orchestration', () => {
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
      comp.targetComponent.onSelectPremium(insurance);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should change the wizard step', () => {
      const step = 2;
      comp.targetComponent.onStepChange(step);
      expect(comp.targetComponent.currentStep).toEqual(step);
    });

    it('should toggle the side nav bar', () => {
      const open = true;
      const action = new layout.OpenLeftSideNav;
      comp.targetComponent.toggleSideNavState(open);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  // describe('Car Advice Flow', () => {
  //   it('should disable next button on invalid form', () => {

  //   });

  //   it('should enable next button on valid form', () => {

  //   });

  //   it('should load car info', () => {

  //   });

  //   it('should show insurance result', () => {

  //   });
  // });

});
