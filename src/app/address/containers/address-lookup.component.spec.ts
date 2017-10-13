import { AuthService } from '../../auth/services/auth.service';
import { NO_ERRORS_SCHEMA, Component, ViewChild, DebugElement } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule, Response, ResponseOptions } from '@angular/http';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { setUpTestBed } from './../../../test.common.spec';

import { Address, AddressLookup, AddressSuggestionParams } from '../models';
import { AddressForm } from '../components/address.form';
import { AuthHttp  } from '../../auth/services';
import { LocalStorageService } from '../../core/services';
import { LoaderService } from '../../components/knx-app-loader/loader.service';
import { AddressLookupComponent } from './address-lookup.component';
import { AddressService } from '../services/address.service';
import { AuthModule } from '../../auth/auth.module';

import * as fromRoot from '../reducers';
import * as fromAddress from '../reducers';

import * as address from '../actions/address';
import * as suggestion from '../actions/suggestion';

@Component({
  template: `<knx-address-lookup [addressForm]="form"></knx-address-lookup>`
})
export class TestHostComponent {
  @ViewChild(AddressLookupComponent)
  targetComponent: AddressLookupComponent;
  form = new AddressForm(new FormBuilder());
}

describe('Component: AddressLookup', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let store: Store<fromAddress.State>;

  const testAddressObj = {
    'postcode': '2512CB',
    'number': '2',
    'street': 'Lutherse Burgwal',
    'city': 's-Gravenhage',
    'county': 's-Gravenhage',
    'province': 'Zuid-Holland',
    'fullname': 'Lutherse Burgwal 2 s-Gravenhage',
    'location': {
       'lat': 52.07535,
       'lng': 4.309771
    },
    'built': 1934,
    'house_size': 182,
    'house_value': 0,
    'house_info_roof_condition_text': 'Onbekend',
    'house_info_house_type_text': '',
    'house_info_house_use_text': 'residence',
    'number_extended': {
       'number_only': 2,
       'number_letter': '',
       'number_addition': '',
       'number_extension': ''
    },
    'rooms': 0,
    'build_type': '',
    'isolation_glass': false,
    'house_type': '',
    'house_subtype': null,
    'id': '2512CB2'
  };

  const addressServiceStub = {
    lookupAddress: (postalCode: string, houseNumber: string, houseNumberExtension: string) => {
      return Observable.of(testAddressObj);
    }
  };

  let moduleDef: TestModuleMetadata = {
    imports: [
      HttpModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'address': combineReducers(fromAddress.reducers)
      })
    ],
    providers: [
      AuthHttp,
      AuthService,
      LocalStorageService,
      {provide: LoaderService, useValue: {}},
      {provide: AddressService, useValue: addressServiceStub},
    ],
    declarations: [
      AddressLookupComponent,
      TestHostComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeAll(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind to store observables', () => {
    comp.targetComponent.ngOnInit();
    fixture.detectChanges();
    expect(comp.targetComponent.addressPreview$).toBeDefined();
    expect(comp.targetComponent.getAddress$).toBeDefined();
    expect(comp.targetComponent.loading$).toBeDefined();
  });

  it('Dispatch address lookup action', () => {
    const payload = {
      postalCode: '2212CB',
      houseNumber: '22'
    } as AddressLookup;

    const action = new address.GetAddress(payload);
    comp.targetComponent.runValidation(payload);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('Dispatch address suggestion action', () => {
    const payload = {
      zipcode: '2212CB',
      house_number: '22'
    } as AddressSuggestionParams;

    const action = new suggestion.GetAddressSuggestion(payload);
    comp.targetComponent.getAddressSuggestions(payload);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
