import {
  NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component,
  ChangeDetectorRef
} from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as faker from 'faker';



import { setUpTestBed } from './../../../../../../test.common.spec';
import { SharedModule } from '@app/shared.module';
import { CarSummaryComponent } from './car-summary.component';

import { TagsService } from '@core/services';
import { TagsServiceMock } from '@core/services/tags.service.mock.spec';
import * as fromAuth from '@auth/reducers';
import * as fromCore from '@core/reducers';
import * as fromInsurance from '@insurance/reducers';
import * as fromRoot from '@app/reducers';
import * as fromCar from '@car/reducers';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromProfile from '@app/profile/reducers';
import { AsyncPipe } from '@angular/common';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import * as router from '@core/actions/router';
import * as wizardActions from '@core/actions/wizard';
import { registrationError } from '@app/registration/models/registration-error';

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
  let store: Store<fromRoot.State>;

  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    imports: [
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      }),
      SharedModule
    ],
    declarations: [CarSummaryComponent, TestHostComponent],
    providers: [
      AsyncPipe,
      ChangeDetectorRef,
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      },
      {
        provide: TagsService,
        useValue: TagsServiceMock
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if an insurance is valid', () => {
    expect(comp.targetComponent.isValidInsurance({})).toBeFalsy();
    expect(comp.targetComponent.isValidInsurance({id: '23434'})).toBeFalsy();
    expect(comp.targetComponent.isValidInsurance({_embedded: {}})).toBeFalsy();
    expect(comp.targetComponent.isValidInsurance({
      _embedded: {
        car: null
      }
    })).toBeFalsy();
  });

  it('should check if an advice is valid', () => {
    expect(comp.targetComponent.isValidAdvice({})).toBeFalsy();
    expect(comp.targetComponent.isValidAdvice({id: '23434'})).toBeFalsy();
    expect(comp.targetComponent.isValidAdvice({address: {zip: '2518CB'}})).toBeTruthy();
  });

  it('should handle buy complete subscription', () => {
    comp.targetComponent.handleBuyComplete(true);
    fixture.detectChanges();

    const action = new router.Go({path: ['/car/thank-you']});
    expect(comp.targetComponent.submiting).toBeFalsy();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should handle buy error subscription', () => {
    const errorMock = ['text', 'duplicate_emailaddress'];
    const expected = {message: registrationError.duplicate_emailaddress};
    comp.targetComponent.handleBuyError(errorMock);
    fixture.detectChanges();

    expect(comp.targetComponent.submiting).toBeFalsy();
    const action = new wizardActions.Error(expected);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should handle buy complete final step', () => {
  });
});
