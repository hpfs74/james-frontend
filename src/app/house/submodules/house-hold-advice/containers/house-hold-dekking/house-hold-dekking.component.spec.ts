import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { KNXLocale } from '@knx/locale';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared.module';
import { TagsService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromHouse from '@app/house/reducers';
import { HouseHoldDekkingComponent } from './house-hold-dekking.component';
import { By } from '@angular/platform-browser';


describe('Component: HouseHoldDekkingComponent', () => {
  let comp: HouseHoldDekkingComponent;
  let fixture:   ComponentFixture<HouseHoldDekkingComponent>;
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
        HouseHoldDekkingComponent
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
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    tagsService = TestBed.get(TagsService);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HouseHoldDekkingComponent);
    comp = fixture.componentInstance;
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
