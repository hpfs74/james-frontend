import { HttpModule, Http } from '@angular/http';
import { TestModuleMetadata, TestBed, inject, async, tick } from '@angular/core/testing';
import { FeatureConfigService } from './feature-config.service';
import { CookieService } from '@app/core/services';
import { CookieServiceMock } from '@app/core/services/cookie.service.mock';
import { KNXFeatureToggleService, KNXFeatureToggleModule } from '@knx/feature-toggle';
import { environment } from '@env/environment';

describe('FeatureConfig', () => {
  let cookieService: CookieService;
  let featureToggleService: KNXFeatureToggleService;

  let moduleDef: TestModuleMetadata = {
    imports: [
      HttpModule,
      KNXFeatureToggleModule.forRoot(environment.featureToggles),
    ],
    providers: [
      FeatureConfigService,
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

});
