
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '@cx/forms';

import { SharedModule } from '../../../shared.module';
import { CarReportingCodeForm } from './car-reporting-code.form';
import { CarSummaryComponent } from './car-summary.component';
@Component({
  template: `
    <knx-car-summary-form
      [advice]="adviceFromHost"
      [insurance]="insuranceFromHost"
      [profile]="profileFromHost">
    </knx-car-summary-form>
  `
})
export class TestHostComponent {
  @ViewChild(CarSummaryComponent)
  public targetComponent: CarSummaryComponent;
  public adviceFromHost: any;
  public insuranceFromHost: any;
  public profileFromHost: any;
}

describe('Component: CarSummaryComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      declarations: [CarSummaryComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if an insurance is valid', () => {
    expect(comp.targetComponent.isValidInsurance({})).toBeFalsy();
    expect(comp.targetComponent.isValidInsurance({ id: '23434' })).toBeFalsy();
    expect(comp.targetComponent.isValidInsurance({ _embedded: {} })).toBeFalsy();
    expect(comp.targetComponent.isValidInsurance({ _embedded: {
        car: null
      }
    })).toBeFalsy();
  });

  it('should check if an advice is valid', () => {
    expect(comp.targetComponent.isValidAdvice({})).toBeFalsy();
    expect(comp.targetComponent.isValidAdvice({ id: '23434' })).toBeFalsy();
    expect(comp.targetComponent.isValidAdvice({ address: {zip: '2518CB'}})).toBeTruthy();
  });
});
