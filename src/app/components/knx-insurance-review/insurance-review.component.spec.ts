import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InsuranceReviewComponent } from './insurance-review.component';
import { KNXCollapsiblePanelComponent } from '../../../../node_modules/@knx/collapsible-panel/index';
import { KNXInfoComponent } from '../../../../node_modules/@knx/info/index';
import { CurrencyPipe } from '@angular/common';

import { setUpTestBed } from './../../../test.common.spec';
import { SharedModule } from '../../shared.module';
import { InsuranceReviewModule } from './insurance-review.module';

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

  let moduleDef: TestModuleMetadata = {
    imports: [SharedModule, InsuranceReviewModule],
    declarations: [TestHostComponent],
    providers: [CurrencyPipe]
  };
  setUpTestBed(moduleDef);

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
      documents: [{name: 'document name', url: 'https://document.com'}],
      _embedded: {insurance: {insurance_logo: 'logogurl-1'}}
    };

    fixture.detectChanges();
  });

  it('should render 3 sections', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-collapsible-panel').length).toBe(3);
  });

  // it('should update the form with profile data (ngOnChanges)', () => {
  //   expect(comp.insuranceReviewComponent).toBeDefined();
  //   spyOn(comp.insuranceReviewComponent, 'ngOnChanges').and.callThrough();

  //   comp.selectedInsuranceFromHost = {
  //     details: '200',
  //     own_risk: '200',
  //     monthly_premium: '200',
  //     one_off_premium: '200',
  //     road_assistance: '200',
  //     legal_aid: '200',
  //     no_claim_protection: '200',
  //     cover_occupants: '200',
  //     documents: [{name: 'document name', url: 'https://document.com'}],
  //     _embedded: {insurance: {insurance_logo: 'logogurl-2'}}
  //   };
  //   fixture.detectChanges();

  //   expect(comp.insuranceReviewComponent.ngOnChanges).toHaveBeenCalled();
  //   expect(comp.insuranceReviewComponent.sections[0].fields[0].value).toEqual('200');
  // });

  xit('should have different flows for supported and unsupported insurances', () => {
    comp.selectedInsuranceFromHost = {
      details: '200',
      own_risk: '200',
      monthly_premium: '200',
      one_off_premium: '200',
      road_assistance: '200',
      legal_aid: '200',
      no_claim_protection: '200',
      cover_occupants: '200',
      supported: false,
      documents: [{name: 'document name', url: 'https://document.com'}],
      _embedded: {insurance: {insurance_logo: 'logogurl-2', url: 'http://test.test'}}
    };
    fixture.detectChanges();

    let de = fixture.debugElement.nativeElement.querySelectorAll('.knx-button.knx-button--secondary');
    expect(de.length).toEqual(1);

    comp.selectedInsuranceFromHost.supported = true;
    fixture.detectChanges();
    de = fixture.debugElement.nativeElement.querySelectorAll('.knx-button.knx-button--secondary.pull-right');
    expect(de.length).toEqual(0);
  });
});
