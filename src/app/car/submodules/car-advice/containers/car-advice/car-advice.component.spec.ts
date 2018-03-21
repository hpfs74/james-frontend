import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { KNXLocale } from '@knx/locale';
import { BrowserModule, By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { setUpTestBed } from './../../../../../../test.common.spec';

import * as fromRoot from '@app/car/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromCar from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromProfile from '@app/profile/reducers';

import * as router from '@app/core/actions/router';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

import * as profile from '@app/profile/actions/profile';
import * as car from '@app/car/actions/car';
import * as insurance from '@app/insurance/actions/insurance';
import * as advice from '@app/insurance/actions/advice';
import * as compare from '@app/car/actions/compare';
import * as coverage from '@app/car/actions/coverage';

import * as FormUtils from '@app/utils/base-form.utils';
import { SharedModule } from '@app/shared.module';
import { AddressModule } from '@app/address/address.module';
import { CarAdviceComponent } from './car-advice.component';
import { CarExtrasForm } from '@app/car/submodules/car-advice/containers/car-extras/car-extras.form';
import { CarDetailForm } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.form';
import { Car } from '@app/car/models/car';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { TagsService } from '@app/core/services/tags.service';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { Router, RouterModule } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { KNXWizardServiceMock } from '@app/core/services/wizard.service.mock';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { CarService } from '@car/services/car.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { AuthHttp } from '@auth/services';
import { SharedService } from '@app/shared/services/shared.service';
import { AssistantService } from '@app/core/services';

let translations: any = {'TEST': 'This is a test'};

class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('Component: CarAdviceComponent', () => {
  let comp: CarAdviceComponent;
  let fixture: ComponentFixture<CarAdviceComponent>;

  let actions: Observable<any>;
  let store: Store<fromCar.State>;
  let tagsService: TagsService;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'app': combineReducers(fromCore.reducers),
          'car': combineReducers(fromCar.reducers),
          'insurance': combineReducers(fromInsurance.reducers),
          'profile': combineReducers(fromProfile.reducers)
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
        })
      ],
      declarations: [
        CarAdviceComponent
      ],
      providers: [
        AssistantService,
        TranslateService,
        CarService,
        MockBackend,
        BaseRequestOptions,
        KNXLocale,
        SharedService,
        {
          provide: TagsService,
          useValue: TagsServiceMock
        },
        {
          provide: ContentConfig,
          useValue: ContentConfigMock
        },
        {
          provide: KNXWizardRxService,
          useValue: KNXWizardServiceMock
        },
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: AuthHttp,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);
    tagsService = TestBed.get(TagsService);
    translateService = TestBed.get(TranslateService);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(CarAdviceComponent);
    comp = fixture.componentInstance;
    comp.ngOnInit();
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  describe('Initialization', () => {

    it('should init the form template', () => {
      const element = fixture.debugElement.query(By.css('form'));
      expect(element).toBeDefined();
      expect(comp).toBeDefined();
    });

    it('should have a CarExtraForm init with proper default values', () => {
      const carExtraForm = comp.carExtrasForm;

      expect(carExtraForm.formConfig.extraOptionsLegal).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsNoClaim).toBeDefined();
      expect(carExtraForm.formConfig.extraOptionsOccupants).toBeDefined();

      expect(carExtraForm.formConfig.roadAssistance).toBeDefined();
      expect(carExtraForm.formConfig.ownRisk).toBeDefined();
      expect(carExtraForm.formConfig.kmPerYear).toBeDefined();
    });

    // it('should bind async validator for car info', () => {
    //   comp.ngAfterViewChecked();
    //   fixture.detectChanges();

    //   let licenseInput = comp.carDetailForm.formGroup.get('licensePlate');
    //   expect(licenseInput).toBeDefined();
    //   expect(licenseInput.validator.length).toBeGreaterThan(0);
    // });
  });

  // describe('Car Info', () => {
  //   it('should load car info', async(() => {
  //     comp.carDetailForm.formGroup.get('licensePlate').setValue('01XLXL');
  //     fixture.whenStable().then(() => {
  //       const carInfoEl = fixture.debugElement.query(By.css('.knx-car-info-message'));
  //       expect(carInfoEl).toBeDefined();
  //     });
  //   }));
  // });

  // describe('Coverage Recommendation', () => {
  //   it('should show no coverage recommendation by default', () => {
  //     const recommendedPriceItem = fixture.debugElement.query(By.css('.knx-price-item__badge'));
  //     expect(recommendedPriceItem).toBeNull();
  //   });

  //   it('should load the coverage recommendation', async(() => {
  //     comp.carDetailForm.formGroup.get('licensePlate').setValue('01XLXL');
  //     comp.carDetailForm.formGroup.get('loan').setValue(false);

  //     fixture.whenStable().then(() => {
  //       const recommendedPriceItem = fixture.debugElement.query(By.css('.knx-price-item__badge'));
  //       expect(recommendedPriceItem).toBeDefined();
  //     });
  //   }));
  // });

  // describe('Car Result Flow', () => {
  //   it('should dispatch when premium is selected', () => {
  //     const insurance = {
  //       id: '2516227',
  //       insurance_id: 'ohra-autoverzekering-aanvullend',
  //       moneyview_id: 'ohra-autoverzekering-aanvullend',
  //       type: 'car',
  //       car: null,
  //       insurance_name: 'Auto',
  //       fit: 78.09,
  //       price_quality: 10,
  //       own_risk: 135,
  //       monthly_premium: 121.99,
  //       documents: [],
  //       details: 'WAVC',
  //       price: 121.99,
  //       product_id: '2516227',
  //       terms_conditions_pdf_url: '',
  //       reviews: 2,
  //       reviews_amount: 4,
  //       supported: true,
  //       _embedded: null
  //     };
  //     const action = new advice.SetInsuranceAction(insurance);
  //     comp.onSelectPremium(insurance);
  //     expect(store.dispatch).toHaveBeenCalledWith(action);
  //   });
  // });

});
