import { CarReportingCodeForm } from './car-reporting-code.form';
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { KNXLocale } from '@knx/locale';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCar from '../../../../reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromProfile from '@app/profile/reducers';

import { setUpTestBed } from '../../../../../../test.common.spec';
import { SharedModule } from '@app/shared.module';
import { TagsService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { CarReportingCodeComponent } from './car-reporting-code.component';

const securityClassMock = [
  { label: 'Security 1', value: 'class1' },
  { label: 'Security 2', value: 'class2' }
];

@Component({
  template: `<knx-car-reporting-code-form [form]="formFromHost" [profile]="profileFromHost"></knx-car-reporting-code-form>`
})
export class TestHostComponent {
  @ViewChild(CarReportingCodeComponent)
  public targetComponent: CarReportingCodeComponent;
  public formFromHost: CarReportingCodeForm = new CarReportingCodeForm(new FormBuilder(), securityClassMock);
  public profileFromHost: any;
}

describe('Component: CarReportingCodeComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    imports: [
      SharedModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      })],
    declarations: [CarReportingCodeComponent, TestHostComponent],
    providers: [
      KNXLocale,
      {
        provide: TagsService,
        useValue: TagsServiceMock
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should init the form', () => {
  //   const element = fixture.debugElement.query(By.css('form'));
  //   expect(element).toBeDefined();
  //   expect(comp.targetComponent).toBeDefined();
  //   expect(comp.targetComponent.form).toBeDefined();
  //   expect(comp.targetComponent.form.formGroup.get('startDate')).toBeDefined();
  // });

  // it('should have invalid form controls on init', () => {
  //   expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();
  // });

  // it('should check for a valid reporting code', () => {
  //   const ctrl = comp.targetComponent.form.formGroup.get('reportingCode');
  //   expect(ctrl.valid).toBeFalsy();
  //   // invalid
  //   ctrl.setValue('123');
  //   fixture.detectChanges();
  //   expect(ctrl.valid).toBeFalsy();

  //   // invalid
  //   ctrl.setValue('test');
  //   fixture.detectChanges();
  //   expect(ctrl.valid).toBeFalsy();

  //   // valid
  //   ctrl.setValue('1234');
  //   fixture.detectChanges();
  //   expect(ctrl.valid).toBeTruthy();
  // });

  // it('should toggle the security class explanation', () => {
  //   expect(comp.targetComponent.selectedSecurityClass).toBeUndefined();
  //   const ctrl = comp.formFromHost.formGroup.get('securityClass').setValue('class1');
  //   fixture.detectChanges();
  //   expect(comp.targetComponent.selectedSecurityClass.tag).toEqual('class1');
  // });
});
