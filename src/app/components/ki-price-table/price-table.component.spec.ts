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

    comp.items = [
      { header: 'Title1', highlight: false, price: 10.00, features: [] },
      { header: 'Title2', highlight: false, price: 20.00, features: [] },
      { header: 'Title3', highlight: false, price: 30.00, features: [] }
    ];

    fixture.detectChanges();
    // de = fixture.debugElement.query(By.css('input'));
    // el = de.nativeElement;
  });

  it('should render with cx-col-sm-4 with 3 elements', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('div.cx-col-sm-4').length).toBe(3);
  });

  it('should render with cx-col-sm-3 with 4 elements', () => {

    comp.items.push({
      header: 'Title4', highlight: false, price: 30.00, features: []
    });
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelectorAll('div.cx-col-sm-3').length).toBe(4);
  });

  it('should show highlight on an element', () => {
    comp.setHightlight(0);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('div.ki-pricing-table--highlight'))).not.toBeNull();
  });
});
