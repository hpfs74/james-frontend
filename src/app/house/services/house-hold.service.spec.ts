import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, async, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';

import { setUpTestBed } from './../../../test.common.spec';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '../../core/services';
import { HouseHoldService } from '@app/house/services/house-hold.service';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import { HttpClient } from '@angular/common/http';

describe('Service: HouseHold', () => {
  let backend, service;

  const configServiceStub = {
    config: {
      api: {
        riskInsurance: {
          getHouseData: '/api/v1/getHouseData'
        }
      }
    }
  };

  const testHouseAddress = {
    Zipode: '2273DE',
    HouseNumber: 220
  };

  const mockHouseDataResponse = {
    'Zipcode': '2273DE',
    'HouseNumber': 220,
    'HouseNumberAddition': '',
    'Street': 'Prinses Irenelaan',
    'Place': 'VOORBURG',
    'HouseType': 'F',
    'BuildYear': 1946,
    'Volume': 0,
    'SurfaceArea': 75,
    'RoomCount': 0
  };

  const testCalculateAmount = {
    OwnedBuilding: 'J',
    FamilyComposition: 'A',
    AmountMoreThan12KAudioVisualComp: 123,
    AmountMoreThan6KJewelry: 456,
    AmountMoreThan15KSpecialPossesion: 678,
    AmountMoreThan6KTenantsInterest: 789,
    BreadWinnerBirthdate: 19991212,
    BreadWinnerMonthlyIncome: 2000
  };

  const mockHouseHoldAmount = {
    InsuredAmount: 1638400
  };

  const testPremiumsRequest = {
    Birthdate: 19991212,
    CommencingDate: 19991212,
    Zipcode: '2273DE',
    HouseNumber: 220,
    HouseType: 'A',
    RoomCount: 3
  };

  const mockHouseHoldPremiums = {
    CommencingDate: 20180101,
    NettoPremium: 123,
    TotalCosts: 123,
    Taxes: 123,
    Premium: 123
  };


  let moduleDef: TestModuleMetadata = {
    imports: [StoreModule.forRoot({})],
    providers: [
      BaseRequestOptions,
      MockBackend,
      LocalStorageService,
      HouseHoldService,
      {
        deps: [
          MockBackend,
          BaseRequestOptions
        ],
        provide: HttpClient,
        useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(async(() => {
    backend = TestBed.get(MockBackend);
    service = TestBed.get(HouseHoldService);
  }));

  describe('House Data Information', () => {
    it('should define the getHouseData function', () => {
      expect(service.getHouseData).toBeDefined();
      expect(typeof service.getHouseData).toBe('function');
    });

    it('should return an Observable<HouseData>', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockHouseDataResponse)
        })));
      });

      inject([HouseHoldService], (houseHoldService) => {
        houseHoldService.getHouseData(testHouseAddress)
          .subscribe((res) => {
            expect(res).toBeDefined();
            expect(res.Zipcode)
              .toEqual(mockHouseDataResponse.Zipcode);
            expect(res.HouseNumber)
              .toEqual(mockHouseDataResponse.HouseNumber);
            expect(res.houseNumberAddition)
              .toEqual(mockHouseDataResponse.HouseNumberAddition);
            expect(res.Street)
              .toEqual(mockHouseDataResponse.Street);
            expect(res.Place)
              .toEqual(mockHouseDataResponse.Place);
            expect(res.HouseType)
              .toEqual(mockHouseDataResponse.HouseType);
            expect(res.BuildYear)
              .toEqual(mockHouseDataResponse.BuildYear);
            expect(res.Volume)
              .toEqual(mockHouseDataResponse.Volume);
            expect(res.SurfaceArea)
              .toEqual(mockHouseDataResponse.SurfaceArea);
            expect(res.RoomCount)
              .toEqual(mockHouseDataResponse.RoomCount);
          });
      });
    });
  });

  describe('HouseHold Calculate Premium Amount', () => {
    it('should define the calculateHouseHoldAmount function', () => {
      expect(service.calculateHouseHoldAmount).toBeDefined();
      expect(typeof service.calculateHouseHoldAmount).toBe('function');
    });

    it('should return an Observable<HouseData>', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockHouseHoldAmount)
        })));
      });

      inject([HouseHoldService], (houseHoldService) => {
        houseHoldService.calculateHouseHoldAmount(testCalculateAmount)
          .subscribe((res) => {
            expect(res).toBeDefined();
          });
      });
    });

    it('should return the amount with decimal', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockHouseHoldAmount)
        })));
      });

      inject([HouseHoldService], (houseHoldService) => {
        houseHoldService.calculateHouseHoldAmount(testCalculateAmount)
          .subscribe((res) => {
            expect(res.InsuredAmount)
              .toEqual(mockHouseHoldAmount.InsuredAmount);
          });
      });
    });
  });

  describe('HouseHold Calculate Premiums', () => {
    it('should define the calculatePremiums function', () => {
      expect(service.calculatePremiums).toBeDefined();
      expect(typeof service.calculatePremiums).toBe('function');
    });

    it('should return an Observable<CalculatedPremium[]>', () => {
      backend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockHouseHoldPremiums)
        })));
      });

      inject([HouseHoldService], (houseHoldService) => {
        houseHoldService.calculatePremiums(testPremiumsRequest)
          .subscribe((res) => {
            const test = res[0];

            expect(test).toBeDefined();
            expect(test.CommencingDate)
              .toEqual(mockHouseHoldPremiums.CommencingDate);
            expect(test.NettoPremium)
              .toEqual(mockHouseHoldPremiums.NettoPremium);
            expect(test.TotalCosts)
              .toEqual(mockHouseHoldPremiums.TotalCosts);
            expect(test.Taxes)
              .toEqual(mockHouseHoldPremiums.Taxes);
            expect(test.Premium)
              .toEqual(mockHouseHoldPremiums.Premium);
          });
      });
    });
  });
});
