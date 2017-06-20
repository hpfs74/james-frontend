import { CarCheckForm } from './car-check.form';
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import { SharedModule } from '../../../shared.module';
import { CarCheckComponent } from './car-check.component';

@Component({
  template: `
    <div>
      <knx-car-check [form]="formFromHost"></knx-car-check>
    </div>`
})
export class TestHostComponent {
  @ViewChild(CarCheckComponent)
  public targetComponent: CarCheckComponent;
  public formFromHost: CarCheckForm = new CarCheckForm(new FormBuilder());
}

describe('Component: CarCheckComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      declarations: [CarCheckComponent, TestHostComponent]
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
    let element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
    expect(comp.targetComponent.form).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();
  });

  it('should check for all questions to be answered', () => {
    const formFields = ['bankruptcy', 'debt', 'refuse', 'driver', 'cause'];
    const lastField = 'register';

    formFields.forEach(( formField ) => {
      comp.targetComponent.form.formGroup.get(formField).setValue(true);
    });
    fixture.detectChanges();
    expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();

    comp.targetComponent.form.formGroup.get(lastField).setValue(true);
    fixture.detectChanges();
    expect(comp.targetComponent.form.formGroup.valid).toBeTruthy();
  });
});
