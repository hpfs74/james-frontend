import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { KNXLocale } from '@knx/locale';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared.module';
import { Address } from '@app/address/models';
import { LocalStorageService } from '@app/core/services/localstorage.service';
import { LoaderService } from '@app/components/knx-app-loader/loader.service';
import { AddressForm } from '@app/address/components/address.form';
import { TagsService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromHouse from '@app/house/reducers';

import { HouseHoldHouseTypeComponent } from './house-hold-house-type.component';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { HttpClient } from '@angular/common/http';

describe('Component: HouseHoldHouseTypeComponent', () => {
  let comp: HouseHoldHouseTypeComponent;
  let fixture: ComponentFixture<HouseHoldHouseTypeComponent>;
  let store: Store<fromRoot.State>;
  let tagsService: TagsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'app': combineReducers(fromCore.reducers),
          'household': combineReducers(fromHouse.reducers)
        })
      ],
      declarations: [
        HouseHoldHouseTypeComponent
      ],
      providers: [
        KNXLocale,
        {
          provide: TagsService,
          useValue: TagsServiceMock
        },
        {
          provide: ContentConfig,
          useValue: ContentConfigMock
        },
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: HttpClient,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    tagsService = TestBed.get(TagsService);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HouseHoldHouseTypeComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function updateForm(room, surface, buildingType, buildYear) {
    comp.form.formGroup.patchValue(Object.assign({}, {
      roomsCount: room,
      surfaceArea: surface,
      buildingType: buildingType,
      buildYear: buildYear
    }));
  }

  beforeEach(() => {
    fixture.detectChanges();
  });

  // describe('form validation', () => {
  //
  //   it('should be invalid if no room count selected', () => {
  //     updateForm(null, 90, 'A', 1800);
  //     expect(comp.form.formGroup.valid).toBeFalsy();
  //   });
  //
  //   it('should be invalid if no surface selected', () => {
  //     updateForm(2, null, 'A', 1800);
  //     expect(comp.form.formGroup.valid).toBeFalsy();
  //   });
  //
  //
  //   it('should be invalid if no buildingType selected', () => {
  //     updateForm(2, 90, null, 1800);
  //     expect(comp.form.formGroup.valid).toBeFalsy();
  //   });
  //
  //   it('should be invalid if no buildingYear selected', () => {
  //     updateForm(2, 90, 'A', null);
  //     expect(comp.form.formGroup.valid).toBeFalsy();
  //   });
  // });
});
