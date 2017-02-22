import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceTableComponent } from './price-table.component';
import { PriceTableItemComponent } from './price-table-item.component';
import { Price } from '../../models/price';


describe('Component: KnabPriceTable', () => {
    let comp: PriceTableComponent;
    let fixture: ComponentFixture<PriceTableComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let prices: Array<Price>;

    beforeEach(async(() => {
        // console.log('Creating testbed component');

        // TestBed.configureTestingModule({
        //     declarations: [KnabPriceTableComponent, KnabPriceTableItemComponent],
        //     imports: []
        // }).compileComponents();
    }));

    beforeEach(() => {
        // fixture = TestBed.createComponent(KnabPriceTableComponent);
        // comp = fixture.componentInstance;
        // prices = new Array<Price>();
        // prices.push({ Header: 'Title1', Highlight: false, Price: 10.00, Features: [] });
        // prices.push({ Header: 'Title2', Highlight: true, Price: 20.00, Features: [] });
        // prices.push({ Header: 'Title3', Highlight: false, Price: 30.00, Features: [] });

        // comp.Items = prices;

        // fixture.detectChanges();
        // de = fixture.debugElement.query(By.css('input'));
        // el = de.nativeElement;
    });

    it('should render with cx-col-sm-4 with 3 elemts', () => {
        // let inputDe = fixture.debugElement.query(By.css('.cx-row'));
        // expect(inputDe).toBeNull();
    });
});
