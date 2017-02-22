import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceTableItemComponent } from './price-table-item.component';
import { Price } from '../../models/price';


describe('Component: KnabPriceTableItem', () => {
    let comp: PriceTableItemComponent;
    let fixture: ComponentFixture<PriceTableItemComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let prices: Array<Price>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceTableItemComponent],
            imports: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceTableItemComponent);
        comp = fixture.componentInstance;
        comp.Header = 'Ciao';

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('div.knab-pricing-table__header'));
        el = de.nativeElement;
    });

    it('should display the header', () => {
        let inputDe = fixture.debugElement.query(By.css('div.knab-pricing-table__header'));
        let el = inputDe.nativeElement;

        expect(el).not.toBeNull();
        console.log(el);
    });
});
