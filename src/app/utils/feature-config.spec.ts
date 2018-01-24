import { HttpModule, Http } from '@angular/http';
import { TestModuleMetadata, TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';

import { setUpTestBed } from './../../test.common.spec';
import { FeatureConfig } from './feature-config';
import { CookieService } from '@app/core/services';
import { KNXFeatureToggleService, KNXFeatureToggleModule } from '@knx/feature-toggle';
import { environment } from '@env/environment';
import { CookieServiceMock } from '@app/core/services/cookie.service.mock';

fdescribe('FeatureConfig', () => {
  let cookieService: CookieService;
  let featureToggleService: KNXFeatureToggleService;

  let moduleDef: TestModuleMetadata = {
    imports: [
      HttpModule,
      KNXFeatureToggleModule.forRoot(environment.featureToggles),
    ],
    providers: [
      FeatureConfig,
      {
        provide: CookieService,
        useValue: CookieServiceMock
      },
      KNXFeatureToggleService
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule(moduleDef);
    cookieService = TestBed.get(CookieService);
    featureToggleService = TestBed.get(KNXFeatureToggleService);
  });

  it('should load the content', async(inject([FeatureConfig], (featureConfig: FeatureConfig) => {
    spyOn(featureConfig, 'setCookie');
    spyOn(featureToggleService, 'setNewConfig');
    featureConfig.load().then(() => {
      expect(featureConfig.setCookie).toHaveBeenCalled();
      expect(featureToggleService.setNewConfig).toHaveBeenCalled();
    });
  })));
});
