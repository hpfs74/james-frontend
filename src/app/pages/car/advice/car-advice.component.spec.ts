import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import * as fromRoot from '../../../reducers';
import * as router from '../../../actions/router';
import * as layout from '../../../actions/layout';
import * as profile from '../../../actions/profile';
import * as assistant from '../../../actions/assistant';
import * as car from '../../../actions/car';
import * as insurance from '../../../actions/insurances';
import * as advice from '../../../actions/advice';
import * as compare from '../../../actions/compare';
import * as coverage from '../../../actions/coverage';

import { SharedModule } from '../../../shared.module';
import { ContentService } from './../../../content.service';
import { CarAdviceComponent } from './car-advice.component';
import { CarExtrasForm } from './car-extras.form';
import { CarDetailForm } from './car-detail.form';

@Component({
  template: `
    <div>
      <knx-car-advice></knx-car-advice>
    </div>`
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
  let store: Store<fromRoot.State>;

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
          ...fromRoot.reducers
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

    xit('should have a CarExtraForm init with proper default values', () => {
      const carExtraForm = comp.targetComponent.carExtrasForm;

      expect(carExtraForm.formGroup.valid).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsLegal).toEqual({});
      expect(carExtraForm.formConfig.extraOptionsNoClaim).toEqual({});
      expect(carExtraForm.formConfig.extraOptionsOccupants).toEqual({});

      expect(carExtraForm.formConfig.roadAssistance).toBeNull({});
      expect(carExtraForm.formConfig.ownRisk).toBeNull({});
      expect(carExtraForm.formConfig.kmPerYear).toBeNull({});
    });
  });

  describe('Observables', () => {

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
      const action = new advice.SelectInsuranceAction(insurance);
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

});
