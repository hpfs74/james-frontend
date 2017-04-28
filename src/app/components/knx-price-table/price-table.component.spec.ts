import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceTableComponent } from './price-table.component';
import { PriceTableItemComponent } from './price-table-item.component';
import { Price } from '../../models/price';


describe('Component: PriceTable', () => {
  let comp: PriceTableComponent;
  let fixture: ComponentFixture<PriceTableComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceTableComponent, PriceTableItemComponent],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTableComponent);
    comp = fixture.componentInstance;

  // header: string;
  // price: number;
  // badge: string;
  // /**
  //  * @description
  //  * List of features
  //  */
  // features: Array<string>;
  // highlight?: boolean;
  // selected?: boolean;

    comp.items = [
      { header: 'Title1', badge: 'Test1', highlight: false, price: 10.00, features: [] },
      { header: 'Title2', badge: 'Test2', highlight: false, price: 20.00, features: [] },
      { header: 'Title3', badge: 'Test3', highlight: false, price: 30.00, features: [] }
    ];

    fixture.detectChanges();
    // de = fixture.debugElement.query(By.css('input'));
    // el = de.nativeElement;
  });

  it('should render with with 3 elements', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-pricing-table').length).toBe(3);
  });

  it('should render with 4 elements', () => {
    let newItem: Price = {
      header: 'Title4',
      badge: 'Test4',
      highlight: false,
      price: 30.00,
      features: []
    };
    comp.items.push(newItem);
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelectorAll('div.knx-pricing-table').length).toBe(4);
  });

  it('should show highlight on an element', () => {
    comp.selectItem(0);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('div.knx-pricing-table--selected'))).not.toBeNull();
  });
});
