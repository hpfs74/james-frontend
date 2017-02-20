import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KnabPriceTableComponent } from './knab-price-table.component';
import { KnabPriceTableItemComponent } from './knab-price-table-item.component';
import { Price } from '../../models/price';


describe('Component: CXInputComponent', () => {
    let comp: KnabPriceTableComponent;
    let fixture: ComponentFixture<KnabPriceTableComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let prices: Array<Price>;

    beforeEach(async(() => {

        prices = new Array<Price>();
        prices.push({ Header: 'Title1', Highlight: false, Price: 10.00, Features: [] });
        prices.push({ Header: 'Title2', Highlight: true, Price: 20.00, Features: [] });
        prices.push({ Header: 'Title3', Highlight: false, Price: 30.00, Features: [] });

        TestBed.configureTestingModule({
            declarations: [KnabPriceTableComponent, KnabPriceTableItemComponent],
            imports: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KnabPriceTableComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('input'));
        el = de.nativeElement;
    });

    it('should render with cx-col-sm-4 with 3 elemts', () => {
        let inputDe = fixture.debugElement.query(By.css('.cx-row'));
        expect(inputDe).toBeNull();
    });
});
