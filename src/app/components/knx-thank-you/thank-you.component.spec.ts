import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { ContentConfig } from '../../content.config';
import { ContentConfigMock } from '../../content.mock.spec';
import { ThankYouComponent } from './thank-you.component';
import { AppPromoBlockComponent } from '../../components/knx-app-promo/app-promo.component';

describe('Component: Thank You', () => {
  let comp: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [ThankYouComponent, AppPromoBlockComponent],
    providers: [
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      },
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-thank-you'));
    el = de.nativeElement;
  });

  it('should take input parameters', () => {
    comp.title = 'Hello World';
    comp.insuranceType = 'autoverzekering';
    comp.email = 'test@mail.com';

    fixture.detectChanges();

    let title = de.query(By.css('h2')).nativeElement;
    expect(title.textContent).toEqual('Hello World');

    let parElements = de.queryAll(By.css('p'));
    expect(parElements).toBeDefined();
    expect(parElements.length).toBeGreaterThan(0);

    const first = parElements[0].nativeElement;
    expect(first.textContent).toContain('Gefeliciteerd met je nieuwe autoverzekering');
    expect(first.textContent.replace(/\s+/g, ' '))
      .toContain('We versturen je aanvraag en de verzekeraar keurt deze binnen 3 dagen goed.');

    const second = parElements[1].nativeElement;
    const expectedEmailPar = 'Zodra je polis goedgekeurd is, sturen wij deze naar test@mail.com';

    expect(second.textContent).toEqual(expectedEmailPar);
  });

});
