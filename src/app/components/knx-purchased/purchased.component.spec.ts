import { DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from '../../../test.common.spec';
import { ContentConfig } from '../../content.config';
import { ContentConfigMock } from '../../content.mock';
import { PurchasedComponent } from './purchased.component';
import { AppPromoBlockComponent } from '../knx-app-promo/app-promo.component';

describe('Component: Purchased', () => {
  let comp: PurchasedComponent;
  let fixture: ComponentFixture<PurchasedComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [PurchasedComponent, AppPromoBlockComponent],
    providers: [
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      },
    ],
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-purchased'));
    el = de.nativeElement;
  });

  it('should show insurances and greetings', () => {
    comp.title = 'Hello World';
    comp.insurances = [
      {
        license: '01XLXL',
        make: 'Honda',
        model: 'Civic',
        insurance_name: 'auto',
        price: '1234'
      },
      {
        license: '01XLX1',
        make: 'BMW',
        model: '3',
        insurance_name: 'auto',
        price: '4321'
      }
    ];

    fixture.detectChanges();

    let title = de.query(By.css('.knx-purchased__title')).nativeElement;
    expect(title.textContent).toEqual('Hello World');

    let parElements = de.queryAll(By.css('.knx-list--unstyled li'));
    expect(parElements).toBeDefined();
    expect(parElements.length).toEqual(2);

    const first = parElements[0].nativeElement;
    expect(first.textContent).toContain('01XLXL');
  });
});
