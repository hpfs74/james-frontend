// angular imports
import { TestBed, async, TestModuleMetadata, ComponentFixture, inject  } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  ActivatedRouteSnapshot,
  UrlSegment,
  Data,
  Route,
  ParamMap,
  Router
} from '@angular/router';
// redux imports
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
// knx imports
import { KNXLocale } from '@knx/locale';
import { KNXFormsModule } from '@knx/forms';
// rxjs imports
import { Observable } from 'rxjs/observable';
// app imports
import { CarDetailComponent } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.component';
import { FeatureConfigService } from '@app/utils/feature-config.service';
import { TagsService, CookieService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { SharedModule } from '@app/shared.module';
import { AddressForm } from '@app/address/components/address.form';
import { CarDetailForm } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.form';
// reducers
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromHouse from '@app/house/reducers';
import * as fromCar from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromProfile from '@app/profile/reducers';
import * as wizardActions from '@app/core/actions/wizard';

export class ActivatedRouteMock implements ActivatedRoute {
  get queryParams(): Observable<Params> {
    return this._queryParams;
  }

  set queryParams(value: Observable<Params>) {
    this._queryParams = value;
  }

  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  private _queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: Type<any> | string;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  readonly paramMap: Observable<ParamMap>;
  readonly queryParamMap: Observable<ParamMap>;
  pathFromRoot: ActivatedRoute[];

  toString(): string {
    return '';
  }
}

const resetTestingModule = TestBed.resetTestingModule,
  preventAngularFromResetting = () => TestBed.resetTestingModule = () => TestBed;
let allowAngularToReset = () => TestBed.resetTestingModule = resetTestingModule;

export const setUpTestBed = (moduleDef: TestModuleMetadata) => {
  beforeAll(done => (async () => {
    resetTestingModule();
    preventAngularFromResetting();
    TestBed.configureTestingModule(moduleDef);
    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => allowAngularToReset());
};

export const setUpTestModule = () => {
  TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      SharedModule,
      ReactiveFormsModule,
      KNXFormsModule,
      StoreModule.forRoot({
        ...fromRoot.reducers,
        'auth': combineReducers(fromAuth.reducers),
        'app': combineReducers(fromCore.reducers),
        'car': combineReducers(fromCar.reducers),
        'insurance': combineReducers(fromInsurance.reducers),
        'profile': combineReducers(fromProfile.reducers)
      }),
      TranslateModule.forRoot()
    ],
    declarations: [
      CarDetailComponent
    ],
    providers: [
      FeatureConfigService,
      CookieService,
      TranslateService,
      {
        provide: ActivatedRoute,
        useValue: ActivatedRouteMock
      },
      {
        provide: TagsService,
        useValue: TagsServiceMock
      },
      {
        provide: Router,
        useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      },
      KNXLocale,
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  });
};
