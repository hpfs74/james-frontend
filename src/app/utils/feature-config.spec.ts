import { HttpModule, Http } from '@angular/http';
import { TestModuleMetadata, TestBed, inject, async } from '@angular/core/testing';
import { FeatureConfig } from './feature-config';
import { CookieService } from '@app/core/services';
import { CookieServiceMock } from '@app/core/services/cookie.service.mock';
import { KNXFeatureToggleService, KNXFeatureToggleModule } from '@knx/feature-toggle';
import { environment } from '@env/environment';

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

  it('should set cookie with value 0', async(inject([FeatureConfig], (featureConfig: FeatureConfig) => {
    const FEATURE_TOOGLE_COOKIE_NAME = 'featureToggleCookie';
    featureConfig.getFeatureGroup();
    const cookieValue = cookieService.get(FEATURE_TOOGLE_COOKIE_NAME);
    expect(cookieValue).toBe('0');
  })));

  it('after content load, cookie value should be different than 0', async(inject([FeatureConfig], (featureConfig: FeatureConfig) => {
    const FEATURE_TOOGLE_COOKIE_NAME = 'featureToggleCookie';
    featureConfig.load().then(() => {
      const cookieValue = cookieService.get(FEATURE_TOOGLE_COOKIE_NAME);
      expect(cookieValue === '0').toBeFalsy();
    });
  })));

  it('should change variables for feature toggle after load', async(inject([FeatureConfig], (featureConfig: FeatureConfig) => {
    const featureToggleVars = environment.featureToggles;
    expect(featureToggleVars).toEqual(featureToggleService.featureToggleConfig);
    featureConfig.load().then(() => {
      const newFeatureToggleVars = featureToggleService.featureToggleConfig;
      expect(featureToggleVars === newFeatureToggleVars).toBeFalsy();
    });
  })));
});
