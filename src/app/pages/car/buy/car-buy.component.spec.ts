import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { StoreModule } from '@ngrx/store';
import { CXFormsModule } from '@cx/forms/index';

// Components
import { CarContactComponent } from './car-contact.component';
import { CarSummaryComponent } from './car-summary.component';
import { CarReportingCodeComponent } from './car-reporting-code.component';
import { CarCheckComponent } from './car-check.component';
import { CarCheckForm } from './car-check.form';
import { CarPaymentComponent } from './car-payment.component';
import { CarBuyComponent } from './car-buy.component';
import { CarService } from '../car.service';

// Services
import * as fromAuth from '../../../reducers';
import { SharedModule } from '../../../shared.module';
import { ChatStreamComponent } from '../../../components/knx-chat-stream/chat-stream.component';
import { AvatarComponent } from '../../../components/knx-avatar/avatar.component';
import { TextMessageComponent } from '../../../components/knx-chat-stream/text-message.component';
import { AuthHttp } from '../../../services/auth-http.service';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { LoaderService } from '../../../components/knx-app-loader/loader.service';
import { ContentService } from '../../../content.service';
import { ProfileService } from '../../../services/profile.service';
import { AssistantService } from '../../../services/assistant.service';

@Component({
  template: `
    <div>
      <knx-car-buy></knx-car-buy>
    </div>`
})
export class TestHostComponent {
  @ViewChild(CarBuyComponent)
  public targetComponent: CarBuyComponent;
  public formFromHost: CarCheckForm = new CarCheckForm(new FormBuilder());
}

describe('Component: CarBuyComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CXFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(fromAuth.reducers)
      ],
      declarations: [
        CarBuyComponent,
        ChatStreamComponent,
        TextMessageComponent,
        CarSummaryComponent,
        AvatarComponent,
        TestHostComponent,
        CarPaymentComponent,
        CarContactComponent,
        CarReportingCodeComponent,
        CarCheckComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AuthHttp,
        AuthService,
        LocalStorageService,
        LoaderService,
        CarService,
        ContentService,
        {
          provide: ContentService, useValue: {
          getContentObject: function () {
            return {
              'car': {
                'securityClass': [{
                  'value': 'SCM_NONE',
                  'title': 'Weet ik niet / Geen',
                  'description': 'Ik weet niet welke klasse alarmsysteem ik heb. Of ik heb geen alarmsysteem.'
                }],
                'coverages': [{
                  'id': 'CL',
                  'header': 'WA',
                  'badge': 'ons advies',
                  'features': ['Schade door vandalisme', 'Schade door eigen schuld'],
                  'highlight': false
                }]
              }
            };
          }
        }
        },
        AssistantService,
        ProfileService,
        CurrencyPipe,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init all the forms', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    // Object.keys(element).forEach((key) => {
    //   console.log(key.parent);
    // })
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
    // comp.targetComponent.formSteps[0].onBeforeNext();
    // console.log(typeof comp.targetComponent.formSteps[0].onBeforeNext());
    expect(comp.targetComponent.formSteps[0].onBeforeNext() instanceof Error).toBeTruthy();
    // console.log(comp.targetComponent.contactDetailForm.formGroup.get('mobilePhone'));

    comp.targetComponent.contactDetailForm.formGroup.get('initials').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('middleName').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('firstName').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('lastName').setValue('A');
    comp.targetComponent.contactDetailForm.formGroup.get('mobilePhone').setValue('0612345678');
    comp.targetComponent.contactDetailForm.formGroup.get('phone').setValue('0613822660');

    // expect(comp.targetComponent.formSteps[0].onBeforeNext() instanceof Observable).toBeTruthy();


    // Object.keys(comp.targetComponent.formSteps[0].onBeforeNext()).forEach((key) => {
    //   console.log(key);
    // });
  });

  // xit('should submit the insurance', () => {
  //   comp.targetComponent.onStepChange(4);
  //   expect(comp.targetComponent.currentStep).toEqual(4);
  // });
});
