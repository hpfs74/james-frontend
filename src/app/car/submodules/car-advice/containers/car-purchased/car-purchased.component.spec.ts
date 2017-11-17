import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../../reducers';
import * as fromCore from '../../../../../core/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromProfile from '../../../../../profile/reducers';

import { SharedModule } from '../../../../../shared.module';
import { CarPurchasedComponent } from './car-purchased.component';
import { ContentConfig } from '../../../../../content.config';
import { ContentConfigMock } from '../../../../../content.mock.spec';

describe('Component: CarPurchasedComponent', () => {
  let comp: CarPurchasedComponent;
  let fixture: ComponentFixture<CarPurchasedComponent>;
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
        })
      ],
      declarations: [
        CarPurchasedComponent
      ],
      providers: [
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
    fixture = TestBed.createComponent(CarPurchasedComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Initialization', () => {
    it('should init the component', () => {
      const element = fixture.debugElement.query(By.css('.knx-car-purchased'));
      expect(element).toBeDefined();
      expect(comp).toBeDefined();
    });

    it('should show the first name and email', () => {
      let firstName = comp.firstName;
      let email = comp.email;
      expect(firstName).toBeDefined();
      expect(email).toBeDefined();
    });
  });
});
