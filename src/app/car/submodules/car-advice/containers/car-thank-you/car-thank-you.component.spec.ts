import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromCar from '@app/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromProfile from '@app/profile/reducers';

import { SharedModule } from '@app/shared.module';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { CarThankYouComponent } from './car-thank-you.component';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderMock } from 'test.common.spec';

describe('Component: CarThankYouComponent', () => {
  let comp: CarThankYouComponent;
  let fixture: ComponentFixture<CarThankYouComponent>;
  let store: Store<fromCar.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
        }),
      ],
      declarations: [
        CarThankYouComponent
      ],
      providers: [
        TranslateService,
        {
          provide: ContentConfig,
          useValue: ContentConfigMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarThankYouComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Initialization', () => {
    it('should init the component', () => {
      const element = fixture.debugElement.query(By.css('.knx-container-thank-you'));
      expect(element).toBeDefined();
      expect(comp).toBeDefined();
    });
  });
});
