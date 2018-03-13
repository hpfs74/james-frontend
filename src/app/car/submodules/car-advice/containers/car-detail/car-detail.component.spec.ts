import { ComponentFixture, TestBed } from '@angular/core/testing';

// redux imports
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

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
// knx imports
import { KNXLocale } from '@knx/locale';
import { KNXFormsModule } from '@knx/forms';
// rxjs imports
import { Observable } from 'rxjs/Observable';
// app imports
import { CarDetailComponent } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.component';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { TagsService, CookieService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { SharedModule } from '@app/shared.module';
import { AddressForm } from '@app/address/components/address.form';
import { CarDetailForm } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.form';
import { CarDataAnaylitcsEvent } from '@app/core/models/analytics';
import { Car } from '@app/car/models';
// reducers
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromHouse from '@app/house/reducers';
import * as fromCar from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromProfile from '@app/profile/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as analyitcsActions from '@app/core/actions/analytics';
import * as carActions from '@app/car/actions/car';

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

describe('Component: CarDetailComponent', () => {
  let comp: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
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
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CarDetailComponent);
    comp = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callThrough();

    comp.ngAfterViewInit();
    fixture.detectChanges();
  });

  describe('Should go to next step', () => {
    it('should throw an error if nothing is selected', () => {
      const wizardAction = new wizardActions.Error({message: comp.form.validationSummaryError});
      comp.goToNextStep();
      let window = {
        innerWidth: 1000
      };
      expect(store.dispatch).toHaveBeenCalledWith(wizardAction);
    });
    it('should dispatch analyitcs event when licenceplate is entered', () => {
      const carDataAvailableEvent: CarDataAnaylitcsEvent = {
        event: 'carDataAvailable',
        error: '',
        car: {
            brand: 'Audi',
            model: 'A4',
            color: 'grijs',
            fuel: 'benzine',
            transmission: 'automaat',
            constructionYear: '1998',
            purchaseValue: '15240',
            dayValue: '10000'
        }
      };

      let carMock: Car = {
        _id: 'asdasdasdas',
        license: '01xlxl',
        vin: '2',
        reporting_code: 'string',
        year: '1998',
        fuel: 'benzine',
        fuel_code: 'string',
        secondary_fuel: 'string',
        color: 'grijs',
        color_code: 'string',
        secondary_color: 'string',
        secondary_color_code: 'string',
        weight_empty_vehicle: 0,
        price_consumer_excl_vat: 0,
        price_consumer_incl_vat: 15240,
        make: 'Audi',
        model: 'A4',
        technical_type: 'string',
        wheels: 0,
        top_speed: 0,
        engine_capacity: 0,
        power_kw: 0,
        transmission: 'automaat',
        transmission_nl: 'string',
        edition: 'string',
        doors: 0,
        slug: [],
        current_value: 10000,
        meldcode: 0,
        nicci_cartransmission_manual_transmission: 'automaat',
        nicci_cartransmission_automatic_transmission: 'automaat',
      };

      const carInfoSuccessAction = new carActions.GetInfoComplete(carMock);
      store.dispatch(carInfoSuccessAction);
      comp.dispatchCarDataAvailableAction();
      const analyticsAction = new analyitcsActions.CarDataAvailableAction(carDataAvailableEvent);
      expect(store.dispatch).toHaveBeenCalledWith(analyticsAction);
    });

    it('should dispatch analyitcs event when licenceplate is entered and has an error', () => {
      const carDataAvailableEvent = {
        event: 'carDataAvailable',
        error: comp.form.validationErrors['licensePlateRDC'](),
        car: {}
      } as CarDataAnaylitcsEvent;

      const carInfoFailure = new carActions.GetInfoFailure({});
      store.dispatch(carInfoFailure);
      comp.dispatchCarDataAvailableAction();
      const analyticsAction = new analyitcsActions.CarDataAvailableAction(carDataAvailableEvent);
      expect(store.dispatch).toHaveBeenCalledWith(analyticsAction);
    });

    // TODO complete tests for this component as a seperate ticket
    it('should dispatch analyitcs event when all data is filled', () => {
      pending();
    });

  });
});
