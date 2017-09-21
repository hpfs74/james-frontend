import { NO_ERRORS_SCHEMA, DebugElement, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CarInfoMessageComponent } from './car-info-message.component';
import { Car } from '../../car/models';

describe('Component: CarInfoMessageComponent', () => {
  let comp: CarInfoMessageComponent;
  let fixture: ComponentFixture<CarInfoMessageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const testData = {
    '_id': 'GK906Z',
    'license': 'GK906Z',
    'vin': null,
    'reporting_code': null,
    'year': '2014',
    'fuel': 'Diesel',
    'fuel_code': 'D',
    'secondary_fuel': null,
    'color': 'zwart',
    'color_code': null,
    'secondary_color': null,
    'secondary_color_code': null,
    'weight_empty_vehicle': 1295,
    'price_consumer_excl_vat': 33940,
    'price_consumer_incl_vat': 39963,
    'make': 'MERCEDES-BENZ',
    'model': 'A-KLASSE',
    'technical_type': '180 D AMG N. ED. PL.',
    'wheels': 4,
    'top_speed': 190,
    'engine_capacity': 1461,
    'power_kw': 80,
    'edition': '180 D AMG N. ED. PL.',
    'doors': 5,
    'current_value': 25534,
    'nicci_cartransmission_manual_transmission': 'Handgeschakeld'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarInfoMessageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'nl-NL'
        },
        CurrencyPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInfoMessageComponent);
    comp = fixture.componentInstance;

    comp.data = testData;

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.knx-car-info-message'));
    el = de.nativeElement;
  });

  it('should show the car data', () => {
    expect(el).not.toBeNull();

    let pipe = new CurrencyPipe('nl-NL');

    expect(el.textContent).toContain(testData.make);
    expect(el.textContent).toContain(testData.model);
    expect(el.textContent).toContain(testData.fuel);
    expect(el.textContent).toContain(pipe.transform(testData.current_value, 'EUR', true));
  });

});

