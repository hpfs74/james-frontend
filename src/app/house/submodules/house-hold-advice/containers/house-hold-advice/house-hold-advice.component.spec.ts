import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { KNXLocale } from '@knx/locale';
import { BrowserModule, By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { setUpTestBed } from '@app/../test.common.spec';

import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromHouseHold from '@app/house/reducers/house-data';

import * as router from '@app/core/actions/router';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

import * as FormUtils from '@app/utils/base-form.utils';
import { SharedModule } from '@app/shared.module';
import { AddressModule } from '@app/address/address.module';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { TagsService } from '@app/core/services/tags.service';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { Router, RouterModule } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { KNXWizardServiceMock } from '@app/core/services/wizard.service.mock';
import { HouseHoldAdviceComponent } from './house-hold-advice.component';
import * as fromHouse from '@app/house/reducers';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('Component: HouseHoldAdviceComponent', () => {
  let comp: HouseHoldAdviceComponent;
  let fixture: ComponentFixture<HouseHoldAdviceComponent>;

  let actions: Observable<any>;
  let store: Store<fromHouseHold.State>;
  let tagsService: TagsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'auth': combineReducers(fromAuth.reducers),
          'app': combineReducers(fromCore.reducers),
          'household': combineReducers(fromHouse.reducers)
        })
      ],
      declarations: [
        HouseHoldAdviceComponent
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
          provide: KNXWizardRxService,
          useValue: KNXWizardServiceMock
        },
        TranslateService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);
    tagsService = TestBed.get(TagsService);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HouseHoldAdviceComponent);
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
  });
});
