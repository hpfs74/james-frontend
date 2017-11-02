import { DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';

import { setUpTestBed } from './../../../test.common.spec';
import { PriceItemComponent } from './price-item.component';
import { Price } from '../../shared/models/price';

describe('Component: PriceItem', () => {
  let comp: PriceItemComponent;
  let fixture: ComponentFixture<PriceItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let prices: Array<Price>;

  let moduleDef: TestModuleMetadata = {
    declarations: [PriceItemComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceItemComponent);
    comp = fixture.componentInstance;
    comp.header = 'WA + Casco';
    comp.price = 13.90;
    comp.features = ['Feat1', 'Feat2', 'Feat3', 'Feat4'];

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.knx-price-item__header'));
    el = de.nativeElement;
  });

  it('should display the header', () => {
    const inputDe = fixture.debugElement.query(By.css('div.knx-price-item__header'));
    const el = inputDe.nativeElement;

    expect(el).not.toBeNull();
    expect(el.innerText).toBe('WA + Casco');
  });

  it('should display the price', () => {
    const inputDe = fixture.debugElement.query(By.css('div.knx-price-item__price span'));
    const el = inputDe.nativeElement;

    expect(el).not.toBeNull();
    expect(el.innerText).toBe('€13.90');
  });

  it('should display list of features', () => {
    const inputDe = fixture.debugElement.query(By.css('ul.knx-list--checks'));
    const el = inputDe.nativeElement;
    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('ul.knx-list--checks > li').length).toBe(4);
  });

  it('should display list of features change adding one more', () => {
    const inputDe = fixture.debugElement.query(By.css('ul.knx-list--checks'));
    const el = inputDe.nativeElement;

    comp.features.push('Feat5');
    fixture.detectChanges();

    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('ul.knx-list--checks > li').length).toBe(5);
  });

  it('should display a not highlighted header by default', () => {
    const inputDe = fixture.debugElement.query(By.css('div.knx-price-item--highlight'));

    expect(comp.highlight).not.toBeTruthy();
    expect(inputDe).toBeNull();
  });

  it('should display highlighted header when Highlight flag is true', () => {
    comp.highlight = true;
    fixture.detectChanges();

    const inputDe = fixture.debugElement.query(By.css('div.knx-price-item--highlight'));
    const el = inputDe.nativeElement;

    expect(el).not.toBeNull();
  });

  it('should display selected item when selected flag is true', () => {
    comp.selected = true;
    fixture.detectChanges();

    const inputDe = fixture.debugElement.query(By.css('div.knx-price-item--selected'));
    const el = inputDe.nativeElement;

    expect(el).not.toBeNull();
  });
});
