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
    let prices: Array<Price>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceTableComponent, PriceTableItemComponent],
            imports: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceTableComponent);
        comp = fixture.componentInstance;
        prices = new Array<Price>();
        prices.push({ Header: 'Title1', Highlight: false, Price: 10.00, Features: [] });
        prices.push({ Header: 'Title2', Highlight: false, Price: 20.00, Features: [] });
        prices.push({ Header: 'Title3', Highlight: false, Price: 30.00, Features: [] });

        comp.Items = prices;

        fixture.detectChanges();
        // de = fixture.debugElement.query(By.css('input'));
        // el = de.nativeElement;
    });

    it('should render with cx-col-sm-4 with 3 elements', () => {
        expect(fixture.debugElement.nativeElement.querySelectorAll('div.cx-col-sm-4').length).toBe(3);
    });

    it('should render with cx-col-sm-3 with 4 elements', () => {

        comp.Items.push({
            Header: 'Title4', Highlight: false, Price: 30.00, Features: []
        });
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.querySelectorAll('div.cx-col-sm-3').length).toBe(4);
    });

    it ('should show highlight on an element', () => {
        comp.setHightlight(0);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.knab-pricing-table--highlight'))).not.toBeNull();
    });
});
