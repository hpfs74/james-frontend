import { CarReportingCodeForm } from './car-reporting-code.form';
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import { SharedModule } from '../../../shared.module';
import { CarReportingCodeComponent } from './car-reporting-code.component';

@Component({
  template: `<div><knx-car-reporting-code-form [form]="formFromHost" [profile]="profileFromHost"></knx-car-reporting-code-form></div>`
})
export class TestHostComponent {
  @ViewChild(CarReportingCodeComponent)
  public targetComponent: CarReportingCodeComponent;
  public formFromHost: CarReportingCodeForm = new CarReportingCodeForm(
    new FormBuilder(), [
      {
        value: 'SCM5',
        title: 'Test',
        description: 'This is a description'
      }
    ]);
  public profileFromHost: any;
}

describe('Component: CarReportingCodeComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      declarations: [CarReportingCodeComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    comp.formFromHost.infoMessages = {
      reportingCode: 'Example explanation icon text'
    };
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
    expect(comp.targetComponent.form).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();
  });

  it('should check for a valid reporting code', () => {
    const ctrl = comp.targetComponent.form.formGroup.get('reportingCode');
    expect(ctrl.valid).toBeFalsy();
    // invalid
    ctrl.setValue('123');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalsy();

    // invalid
    ctrl.setValue('test');
    fixture.detectChanges();
    expect(ctrl.valid).toBeFalsy();

    // valid
    ctrl.setValue('1234');
    fixture.detectChanges();
    expect(ctrl.valid).toBeTruthy();
  });

  it('should toggle the security class explanation', () => {
    expect(comp.targetComponent.selectedSecurityClass).toBeUndefined();
    const ctrl = comp.formFromHost.formGroup.get('securityClass').setValue('SCM5');
    fixture.detectChanges();
    expect(comp.targetComponent.selectedSecurityClass.value).toEqual('SCM5');
    expect(comp.targetComponent.selectedSecurityClass.title).toEqual('Test');
  });
});
