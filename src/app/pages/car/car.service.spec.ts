import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { CarService } from './car.service';
import { AuthHttp, LocalStorageService } from '../../services';
import { Car } from '../../models/car';
import { CarCompare } from '../../models/car-compare';

describe('Service: Car', () => {
  let backend, service;

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

  const testLicense = 'AA12KNAB';
  const mockCarInfoResponse = {
    'license': testLicense,
    'vin': 'VF1BA0F0G17869206',
    'reporting_code': '9206',
    'year': 2016,
    'fuel': 'Gasoline',
    'secondary_fuel': null,
    'color': 'Blauw',
    'color_code': '04',
    'secondary_color': 'Onbekend',
    'secondary_color_code': '99',
    'weight_empty_vehicle': 1030,
    'price_consumer_excl_vat': 14841,
    'price_consumer_incl_vat': 16976,
    'make': 'RENAULT',
    'model': 'MEGANE',
    'technical_type': '1.6 E HB RT',
    'wheels': 4,
    'top_speed': 184,
    'engine_capacity': 1598,
    'power_kw': 66,
    'transmission': 'Manual',
    'transmission_nl': 'Handgeschakeld',
    'edition': null,
    'doors': 5,
  };

  const mockCoverageResponse = {
    'recommended_value': 'CLC',
    'slug': [
      'coverage_recommandation_limited_casco_text'
    ]
  };

  const mockCarCompareRequest: CarCompare = {
    'license': 'GK906T',
    'gender': 'm',
    'date_of_birth': '1991-10-26',
    'house_number': '234',
    'title': 'Dhr.',
    'zipcode': '2512GH',
    'country': 'NL',
    'coverage': 'CL',
    'claim_free_years': 7,
    'household_status': 'CHMP',
    'active_loan': false,
    'kilometers_per_year': 'KMR3',
    'own_risk': 0,
    'risk': 'RTUD',
    'road_assistance': 'RANO',
    'legal_aid': 'LAY',
    'cover_occupants': false,
    'no_claim_protection': false,
    'insurance_id': ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        BaseRequestOptions,
        MockBackend,
        LocalStorageService,
        CarService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: AuthHttp,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    backend = TestBed.get(MockBackend);
    service = TestBed.get(CarService);
  }));

  describe('Car Information', () => {
    it('should define the getByLicense function', () => {
      expect(service.getByLicense).toBeDefined();
    });

    it('should return an Observable<Car>', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockCarInfoResponse)
        })));
      });

      inject([CarService], (carService) => {
        carService.getByLicense(testLicense).subscribe((res) => {
          expect(res).toBeDefined();
          expect(res.license).toEqual(testLicense);
          expect(res.vin).toEqual(mockCarInfoResponse.vin);
          // TODO: ... other properties
        });
      });
    });
  });

  describe('Car Coverage', () => {
    it('should define the getCoverageRecommendation function', () => {
      expect(service.getCoverageRecommendation).toBeDefined();
    });

    it('should return a Observable<CarCoverageRecommendation>', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockCoverageResponse)
        })));
      });

      inject([CarService], (carService) => {
        carService.getCoverageRecommendation(testLicense).subscribe((res) => {
          expect(res).toBeDefined();
          expect(res.recommended_value).toEqual('CLC');
        });
      });
    });
  });

  describe('Car Insurance Compare', () => {
    it('should define the getInsurances function', () => {
      expect(service.getInsurances).toBeDefined();
    });

    it('should return an Observable<Array<CarInsurance>>', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({})
        })));
      });

      inject([CarService], (carService) => {
        carService.getInsurances(mockCarCompareRequest).subscribe((res) => {
          expect(res).toBeDefined();
        });
      });
    });
  });

});
