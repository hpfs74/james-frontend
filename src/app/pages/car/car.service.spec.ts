import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../config.service';
import { CarService } from './car.service';
import { AuthHttp } from '../../services';
import { Car } from '../../models/car';
import { CarInsuranceOptions, CarCompare } from '../../models/car-compare';

describe('Service: Car', () => {
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
    'first_name': null,
    'gender': 'm',
    'date_of_birth': '1991-10-26',
    'house_number': '234',
    'last_name': null,
    'title': 'Dhr.',
    'zipcode': '2512GH',
    'country': 'NL',
    'coverage': 'CL',
    'claim_free_years': 7,
    'household_status': 'CHMP',
    'active_loan': false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        BaseRequestOptions,
        MockBackend,
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

    this.backend = TestBed.get(MockBackend);
    this.service = TestBed.get(CarService);
  }));

  describe('Car Information', () => {
    it('should define the getByLicense function', () => {
      expect(this.service.getByLicense).toBeDefined;
    });

    it('should return an Observable<Car>', () => {
      this.backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockCarInfoResponse)
        })));
      });

      inject([CarService], (carService) => {
        carService.getByLicense(testLicense).subscribe((res) => {
          expect(res).toBeDefined;
          expect(res.license).toEqual(testLicense);
          expect(res.vin).toEqual(mockCarInfoResponse.vin);
          // TODO: ... other properties
        });
      });
    });
  });

  describe('Car Coverage', () => {
    it('should define the getCoverageRecommendation function', () => {
      expect(this.service.getCoverageRecommendation).toBeDefined;
    });

    it('should return a Observable<CarCoverageRecommendation>', () => {
      this.backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockCoverageResponse)
        })));
      });

      inject([CarService], (carService) => {
        carService.getCoverageRecommendation(testLicense).subscribe((res) => {
          expect(res).toBeDefined;
          expect(res.recommended_value).toEqual('CLC');
        });
      });
    });
  });

  describe('Car Insurance Compare', () => {
    it('should define the getInsurances function', () => {
      expect(this.service.getInsurances).toBeDefined;
    });

    it('should return an Observable<Array<CarInsurance>>', () => {
      this.backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({})
        })));
      });

      inject([CarService], (carService) => {
        carService.getInsurances(mockCarCompareRequest).subscribe((res) => {
          expect(res).toBeDefined;
        });
      });
    });
  });

});
