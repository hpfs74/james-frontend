import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { KNXCollapsiblePanelComponent } from '@knx/collapsible-panel/index';
import { KNXFormsModule } from '@knx/forms';

import { SharedModule } from '@app/shared.module';
import { InsuranceReviewCarComponent } from './insurance-review-car.component';
import { InsuranceReviewModule } from './insurance-review.module';
import { TagsService } from '@app/core/services/tags.service';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { CookieService } from '@app/core/services';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        NoopAnimationsModule,
        BrowserModule,
        KNXFormsModule,
        SharedModule,
        InsuranceReviewModule
      ],
      declarations: [
        TestHostComponent
      ],
      providers: [
        FeatureConfigService,
        CookieService,
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
      _embedded: {insurance: {insurance_logo: 'logogurl-1'}},
      car_current_value: 975,
      additional_details: {
        replacemant_vehicle_bl: true,
        replacemant_vehicle_nl: false,
        damages: {
          damages_firedamage: {
            icon: '',
            value: false
          },
          damages_windowdamage: {
            icon: '',
            value: false
          },
          damages_transportation: {
            icon: '',
            value: false
          },
          damages_limited_casco: {
            icon: '',
            value: false
          },
          damages_noblamenoclaim: {
            icon: '',
            value: false
          },
          damages_animals_damage: {
            icon: '',
            value: false
          },
          damages_unmotorised_traffic_participant: {
            icon: '',
            value: false
          },
        }
      }
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
