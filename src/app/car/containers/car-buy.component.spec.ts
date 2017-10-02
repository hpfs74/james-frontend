import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { StoreModule, Store, State, ActionReducer, combineReducers } from '@ngrx/store';
import { CXFormsModule } from '@cx/forms/index';

// Components
import { CarContactComponent } from '../components/buy/car-contact.component';
import { CarSummaryComponent } from '../components/buy/car-summary.component';
import { CarReportingCodeComponent } from '../components/buy/car-reporting-code.component';
import { CarCheckComponent } from '../components/buy/car-check.component';
import { CarCheckForm } from '../components/buy/car-check.form';
import { CarPaymentComponent } from '../components/buy/car-payment.component';
import { CarBuyComponent } from './car-buy.component';
import { CarService } from '../services/car.service';

import * as fromRoot from '../reducers';
import * as fromCore from '../../core/reducers';
import * as fromCar from '../reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromAdvice from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';

import { SharedModule } from '../../shared.module';
import { TextMessageComponent } from '../../components/knx-chat-stream/text-message.component';

@Component({
  template: `<div><knx-car-buy></knx-car-buy></div>`
})
export class TestHostComponent {
  @ViewChild(CarBuyComponent)
  public targetComponent: CarBuyComponent;
  public formFromHost: CarCheckForm = new CarCheckForm(new FormBuilder());
}

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

describe('Component: CarBuyComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let store: Store<fromAuth.State>;

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
        }, {
            initialState: getInitialState
          })
      ],
      declarations: [
        CarBuyComponent,
        CarSummaryComponent,
        TestHostComponent,
        CarPaymentComponent,
        CarContactComponent,
        CarReportingCodeComponent,
        CarCheckComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        CurrencyPipe,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }]
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init all the forms', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
    expect(comp.targetComponent.contactDetailForm).toBeDefined();
    expect(comp.targetComponent.reportingCodeForm).toBeDefined();
    expect(comp.targetComponent.checkForm).toBeDefined();
    expect(comp.targetComponent.paymentForm).toBeDefined();
  });

  it('should update the step counter', () => {
    comp.targetComponent.onStepChange(4);
    expect(comp.targetComponent.currentStep).toEqual(4);
  });

  it('should validate the form before next step', () => {
    comp.targetComponent.contactDetailForm.formGroup.get('initials').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('middleName').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('firstName').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('lastName').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('mobileNumber').setValue('0612345678');
    comp.targetComponent.contactDetailForm.formGroup.get('phoneNumber').setValue('0613822660');
    expect(comp.targetComponent.formSteps[0].onBeforeNext() instanceof Observable).toBeTruthy();
  });
});
