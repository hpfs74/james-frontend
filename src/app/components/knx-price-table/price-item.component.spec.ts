import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { PriceItemComponent } from './price-item.component';
import { Price } from '../../models/price';


describe('Component: PriceItem', () => {
  let comp: PriceItemComponent;
  let fixture: ComponentFixture<PriceItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let prices: Array<Price>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceItemComponent],
      imports: []
    }).compileComponents();
  }));

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
    let inputDe = fixture.debugElement.query(By.css('div.knx-price-item__header'));
    let el = inputDe.nativeElement;

    expect(el).not.toBeNull();
    expect(el.innerText).toBe('WA + Casco');
  });

  it('should display the price', () => {
    let inputDe = fixture.debugElement.query(By.css('div.knx-price-item__price span'));
    let el = inputDe.nativeElement;

    expect(el).not.toBeNull();
    expect(el.innerText).toBe('€13.90');
  });

  it('should display list of features', () => {
    let inputDe = fixture.debugElement.query(By.css('ul.knx-price-item__features'));
    let el = inputDe.nativeElement;
    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('ul.knx-price-item__features > li').length).toBe(4);
  });

  it('should display list of features change adding one more', () => {
    let inputDe = fixture.debugElement.query(By.css('ul.knx-price-item__features'));
    let el = inputDe.nativeElement;

    comp.features.push('Feat5');
    fixture.detectChanges();

    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('ul.knx-price-item__features > li').length).toBe(5);
  });

  it('should display a not highlighted header by default', () => {
    let inputDe = fixture.debugElement.query(By.css('div.knx-price-item--highlight'));

    expect(comp.highlight).not.toBeTruthy();
    expect(inputDe).toBeNull();
  });

  it('should display highlighted header when Highlight flag is true', () => {
    comp.highlight = true;
    fixture.detectChanges();

    let inputDe = fixture.debugElement.query(By.css('div.knx-price-item--highlight'));
    let el = inputDe.nativeElement;

    expect(el).not.toBeNull();
  });

  it('should display selected item when selected flag is true', () => {
    comp.selected = true;
    fixture.detectChanges();

    let inputDe = fixture.debugElement.query(By.css('div.knx-price-item--selected'));
    let el = inputDe.nativeElement;

    expect(el).not.toBeNull();
  });
});
