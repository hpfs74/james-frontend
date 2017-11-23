import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { KNXCollapsiblePanelComponent } from '@knx/collapsible-panel/index';
import { KNXFormsModule } from '@knx/forms';

import { SharedModule } from '../../shared.module';
import { InsuranceReviewCarComponent } from './insurance-review-car.component';
import { InsuranceReviewModule } from './insurance-review.module';
import { TagsService } from '../../core/services/tags.service';
import { TagsServiceMock } from '../../core/services/tags.service.mock.spec';

@Component({
  template: `<knx-insurance-review-car [carInsurance]="carInsuranceFromHost"></knx-insurance-review-car>`
})
export class TestHostComponent {
  @ViewChild(InsuranceReviewCarComponent)
  public testComponent: InsuranceReviewCarComponent;
  public carInsuranceFromHost: any;
}

describe('Component: InsuranceReviewCarComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        SharedModule,
        InsuranceReviewModule],
      declarations: [
        TestHostComponent
      ],
      providers: [
        CurrencyPipe,
        {
          provide: TagsService,
          useValue: TagsServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    comp.carInsuranceFromHost =  {
      details: '100',
      own_risk: '100',
      monthly_premium: '100',
      one_off_premium: 100,
      road_assistance: '100',
      legal_aid: '100',
      supported: false,
      no_claim_protection: '100',
      cover_occupants: '100',
      documents: [{name: 'document name', url: 'https://document.com'}],
      _embedded: {insurance: {insurance_logo: 'logogurl-1'}}
    };
    fixture.detectChanges();

  });

  it('should display one off fee if it is greater than 0', () => {
    comp.carInsuranceFromHost.one_off_premium = 200;
    fixture.detectChanges();

    expect(comp.testComponent.showOneOffPremium()).toBeTruthy();
  });

  it('should hide one off fee if it is 0', () => {
    comp.carInsuranceFromHost.one_off_premium = 0;
    fixture.detectChanges();

    expect(comp.testComponent.showOneOffPremium()).toBeFalsy();
  });
});
