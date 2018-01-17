import { NO_ERRORS_SCHEMA, DebugElement, LOCALE_ID } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { setUpTestBed } from './../../../test.common.spec';
import { NavUserComponent } from './nav-user.component';
import { Car } from '../../car/models';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as fromCore from '../../core/reducers';
import * as fromCar from '../../reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';
describe('Component: NavUserComponent', () => {
  let comp: NavUserComponent;
  let fixture: ComponentFixture<NavUserComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [NavUserComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
      RouterTestingModule,
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
      {
        provide: LOCALE_ID,
        useValue: 'nl-NL'
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUserComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return the email name', () => {
    expect(comp.getShortEmail('test@mail.com')).toEqual('test');
  });

});

