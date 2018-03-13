import { Component, DebugElement, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { setUpTestBed } from './../../../../../../test.common.spec';
import { InsuranceTopListComponent } from './insurance-toplist.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { HttpModule } from '@angular/http';
import { CookieService } from '@app/core/services';

import * as car from '../../../../actions/car';
import * as fromRoot from '../../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCar from '../../../../reducers';
import * as fromAddress from '../../../../../address/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';
import * as coverage from '../../../../actions/coverage';
import * as compare from '../../../../actions/compare';
import * as FormUtils from '../../../../../utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromProfile from '@app/profile/reducers';
@Component({
  template: `<div><knx-insurance-toplist [initialAmount]="initialAmount" [insurances]="insurances"></knx-insurance-toplist></div>`
})
export class TestHostComponent {
  @ViewChild(InsuranceTopListComponent)
  public testComponent: InsuranceTopListComponent;
  public initialAmount = 4;
  public insurances = [{fit: 100}, {fit: 100}, {fit: 100}, {fit: 100}, {fit: 100}];
}

describe('Component: InsuranceTopList', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    declarations: [InsuranceTopListComponent, TestHostComponent],
    imports: [
      HttpModule,
      BrowserModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      })
    ],
    providers: [
      FeatureConfigService,
      CookieService
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize default sorting options', () => {
    fixture.detectChanges();
    expect(comp.testComponent.orderBy.length).toBe(2);
  });

  // it('should show all insurances', () => {
  //   comp.testComponent.total = 0;
  //   comp.testComponent.showAll();
  //   fixture.detectChanges();
  //   expect(comp.testComponent.total).toBeTruthy();
  // });

  it ('should show empty insurance list message', () => {
    comp.testComponent.insurances = [];
    fixture.detectChanges();
    expect(comp.testComponent.noResult()).toBeTruthy();
  });

});
