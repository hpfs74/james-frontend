import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceTableItemComponent } from './price-table-item.component';
import { Price } from '../../models/price';


describe('Component: PriceTableItem', () => {
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
        comp.Header = 'WA + Casco';
        comp.Price = 13.90;
        comp.Features = ['Feat1', 'Feat2', 'Feat3', 'Feat4'];

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('div.knab-pricing-table__header'));
        el = de.nativeElement;
    });

    it('should display the header', () => {
        let inputDe = fixture.debugElement.query(By.css('div.knab-pricing-table__header'));
        let el = inputDe.nativeElement;

        expect(el).not.toBeNull();
        expect(el.innerText).toBe('WA + Casco');
    });

    it ('should display the price', () => {
         let inputDe = fixture.debugElement.query(By.css('span.knab-pricing-table__price-amount'));
        let el = inputDe.nativeElement;

        expect(el).not.toBeNull();
        expect(el.innerText).toBe('€ 13.9');
    });

    it ('shoud display list of features', () => {
        let inputDe = fixture.debugElement.query(By.css('ul.knab-pricing-table__features'));
        let el = inputDe.nativeElement;
        expect(el).not.toBeNull();
        expect(fixture.debugElement.nativeElement.querySelectorAll('ul.knab-pricing-table__features > li').length).toBe(4);
    });
});
