import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { InsuranceReviewComponent } from './insurance-review.component';
import { KNXCollapsiblePanelComponent } from '../../../../node_modules/@knx/collapsible-panel/index';
import { KNXInfoComponent } from '../../../../node_modules/@knx/info/index';

import { CXFormsModule } from '../../../../node_modules/@cx/forms';

@Component({
  template: `<div><knx-insurance-review [selectedInsurance]="selectedInsuranceFromHost"></knx-insurance-review></div>`
})
export class TestHostComponent {
  @ViewChild(InsuranceReviewComponent)
  public insuranceReviewComponent: InsuranceReviewComponent;
  public selectedInsuranceFromHost: any;
}

describe('Component: InsuranceReviewComponent', () => {
  let comp: InsuranceReviewComponent;
  let fixture: ComponentFixture<InsuranceReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule],
      declarations: [InsuranceReviewComponent, KNXCollapsiblePanelComponent, TestHostComponent, KNXInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceReviewComponent);
    comp = fixture.componentInstance;

    comp.sections = [
      {
        label: 'Section label',
        fields: [
          {
            label: 'Field label',
            value: '100',
            info: 'Information message'
          }
        ]
      },
      {
        label: 'Section label',
        fields: [
          {
            label: 'Field label',
            value: '100'
          }
        ]
      }
    ];

    fixture.detectChanges();
  });

  it('should render 2 sections', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-collapsible-panel').length).toBe(2);
  });

  it('should update the form with profile data (ngOnChanges)', () => {
    this.selectedInsuranceFromHost = {
      details: '100',
      own_risk: '100',
      monthly_premium: '100',
      one_off_premium: '100',
      road_assistance: '100',
      legal_aid: '100',
      no_claim_protection: '100',
      cover_occupants: '100'
    };

    // expect(comp.carContactComponent).toBeDefined();
    // spyOn(comp.carContactComponent, 'ngOnChanges').and.callThrough();
    // fixture.detectChanges();
    // expect(comp.carContactComponent.ngOnChanges).toHaveBeenCalled();
    // expect(comp.carContactComponent.form.formGroup.get('firstName').value).toEqual('John');
    // expect(comp.carContactComponent.form.formGroup.get('lastName').value).toEqual('Doe');
    // expect(comp.carContactComponent.form.formGroup.get('mobileNumber').value).toEqual('0612345678');
  });
});
