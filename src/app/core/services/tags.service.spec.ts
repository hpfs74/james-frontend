import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { setUpTestBed } from './../../../test.common.spec';
import { TagsService } from './tags.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoaderMock } from '../../../test.common.spec';

describe('Service: Tags', () => {
  let backend, service: TagsService;

  const configServiceStub = {
    config: {
      api: {
        james: {
          car: 'api/car',
          helper: 'api/helper/car'
        }
      }
    }
  };

  let moduleDef: TestModuleMetadata = {
    imports: [HttpModule,
      TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
      })
    ],
    providers: [
      BaseRequestOptions,
      MockBackend,
      TagsService,
      TranslateService
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(async(() => {
    backend = TestBed.get(MockBackend);
    service = TestBed.get(TagsService);
    service.load();
  }));

  describe('getByKey', () => {
    it('should return a property value by key', () => {
      let result = service.getByKey('car_flow_km_per_year');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return null on unknown key', () => {
      expect(service.getByKey('unkown_value_test')).toBeNull();
    });
  });

  describe('getTranslationText', () => {
    it('should return a translation text', () => {
      expect(service.getTranslationText('car_flow_km_per_year', 'KMR1')).toEqual('7.500 of minder');
    });

    it('should return null on unkown', () => {
      expect(service.getTranslationText('unkown_value_test', 'random')).toBeNull();
    });

    it('should remove html tags and icons', () => {
      expect(service.getTranslationText('car_flow_road_assistance', 'RACO'))
        .toEqual('Binnen Nederland');
    });
  });

  describe('getTranslationDescription', () => {
    it('should return a translation description', () => {
      expect(service.getTranslationDescription('car_flow_km_per_year', 'KMR1'))
        .toEqual('Ik stap alleen in de auto voor de wekelijkse boodschappen.');
    });
  });

  describe('getAsLabelValue', () => {
    it('should return a label, value array', () => {
      const result = service.getAsLabelValue('car_flow_km_per_year');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('sanitizeText', () => {
    it('should remove icon placeholder', () => {
      expect(service.sanitizeText('hello (ii)')).toEqual('hello');
    });

    it('should remove HTML tags', () => {
      expect(service.sanitizeText('hello <strong>test</strong>')).toEqual('hello test');
      expect(service.sanitizeText('<a href="">link</a>')).toEqual('link');
    });
  });
});
