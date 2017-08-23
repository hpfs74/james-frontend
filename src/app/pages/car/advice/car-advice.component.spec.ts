
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import { SharedModule } from '../../../shared.module';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      declarations: [CarAdviceComponent, TestHostComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
  });

  xit('should have invalid form controls on init', () => {
    // expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();
  });

  xit('should have a CarExtraForm init with proper default values', () => {
    const carExtraForm = comp.targetComponent.carExtrasForm;

    // expect(carExtraForm.formGroup.valid).toBeTruthy();
    expect(carExtraForm.formConfig.extraOptionsLegal).toBeFalsy();
  });

});
