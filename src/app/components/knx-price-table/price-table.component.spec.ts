import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceTableComponent } from './price-table.component';
import { PriceItemComponent } from './price-item.component';
import { Price } from '../../models/price';


describe('Component: PriceTable', () => {
  let comp: PriceTableComponent;
  let fixture: ComponentFixture<PriceTableComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceTableComponent, PriceItemComponent],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTableComponent);
    comp = fixture.componentInstance;

    comp.items = [
      { id: 'a', header: 'Title1', badge: 'Test1', highlight: false, price: 10.00, features: [] },
      { id: 'b', header: 'Title2', badge: 'Test2', highlight: false, price: 20.00, features: [] },
      { id: 'c', header: 'Title3', badge: 'Test3', highlight: false, price: 30.00, features: [] }
    ];

    fixture.detectChanges();
    // de = fixture.debugElement.query(By.css('input'));
    // el = de.nativeElement;
  });

  it('should render with with 3 elements', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-price-item').length).toBe(3);
  });

  it('should render with 4 elements', () => {
    const newItem: Price = {
      id: 'd',
      header: 'Title4',
      badge: 'Test4',
      highlight: false,
      price: 30.00,
      features: []
    };
    comp.items.push(newItem);
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-price-item').length).toBe(4);
  });

  it('should show highlight on an element', () => {
    comp.selectItem(0);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('div.knx-price-item--selected'))).not.toBeNull();
  });
});
