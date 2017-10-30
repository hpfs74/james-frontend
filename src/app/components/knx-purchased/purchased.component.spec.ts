import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from '../../../test.common.spec';
import { PurchasedComponent } from './purchased.component';
import { AppPromoBlockComponent } from '../knx-app-promo/app-promo.component';

describe('Component: Purchased', () => {
  let comp: PurchasedComponent;
  let fixture: ComponentFixture<PurchasedComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [PurchasedComponent, AppPromoBlockComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-purchased'));
    el = de.nativeElement;
  });
});
