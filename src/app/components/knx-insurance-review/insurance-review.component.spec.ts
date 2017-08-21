import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { InsuranceReviewComponent } from './insurance-review.component';
import { KNXCollapsiblePanelComponent } from '../../../../node_modules/@knx/collapsible-panel/index';
import { KNXInfoComponent } from '../../../../node_modules/@knx/info/index';

import { CXFormsModule } from '../../../../node_modules/@cx/forms';

@Component({
  template: `
    <div>
      <knx-insurance-review [selectedInsurance]="selectedInsuranceFromHost"></knx-insurance-review>
    </div>`
})
export class TestHostComponent {
  @ViewChild(InsuranceReviewComponent)
  public insuranceReviewComponent: InsuranceReviewComponent;
  public selectedInsuranceFromHost: any;
  public sections: any;
}

describe('Component: InsuranceReviewComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule],
      declarations: [InsuranceReviewComponent, KNXCollapsiblePanelComponent, TestHostComponent, KNXInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    comp.selectedInsuranceFromHost = {
      details: '100',
      own_risk: '100',
      monthly_premium: '100',
      one_off_premium: '100',
      road_assistance: '100',
      legal_aid: '100',
      no_claim_protection: '100',
      cover_occupants: '100',
      _embedded: {insurance: {insurance_logo: 'logogurl-1'}}
    };

    fixture.detectChanges();
  });

  it('should render 3 sections', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-collapsible-panel').length).toBe(3);
  });

  it('should update the form with profile data (ngOnChanges)', () => {
    expect(comp.insuranceReviewComponent).toBeDefined();
    spyOn(comp.insuranceReviewComponent, 'ngOnChanges').and.callThrough();

    comp.selectedInsuranceFromHost = {
      details: '200',
      own_risk: '200',
      monthly_premium: '200',
      one_off_premium: '200',
      road_assistance: '200',
      legal_aid: '200',
      no_claim_protection: '200',
      cover_occupants: '200',
      _embedded: {insurance: {insurance_logo: 'logogurl-2'}}
    };
    fixture.detectChanges();

    expect(comp.insuranceReviewComponent.ngOnChanges).toHaveBeenCalled();
    expect(comp.insuranceReviewComponent.sections[0].fields[0].value).toEqual('200');
  });
});
