import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../insurance/models';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
}

@Component({
  selector: 'knx-insurance-toplist',
  styleUrls: ['./insurance-toplist.component.scss'],
  template: `
  <div class="knx-insurance-toplist">

    <div class="row">
      <div class="col-sm-12">

        <div *ngIf="isLoading; else insuranceResults">
          <knx-loader [visible]="isLoading">
            Een momentje! We vergelijken meer dan 20 verschillende aanbieders voor je om de beste match te vinden.
          </knx-loader>
        </div>

        <div *ngIf="noResult()" class="knx-message knx-message--hint">
          Niets gevonden. Ga terug om je keuze aan te passen. Kom je er niet uit? Neem contact op.
        </div>

        <ng-template #insuranceResults>
          <h2>We hebben 23 resultaten gevonden</h2>

          <div class="knx-button-group" role="group">
            <button
              *ngFor="let item of orderBy"
              class="knx-button knx-button--toggle"
              [class.knx-button--toggle-active]="item.active"
              (click)="changeOrderBy(item)">{{ item.label }}
            </button>
          </div>

          <knx-insurance-result
            *ngFor="let item of insurances | slice:0:total; let i = index; trackBy: trackInsurance"
            [insurance]="item" [index]="i" (insuranceSelected$)="selectInsurance($event)" [disableButton]="disableInsuranceBuy">
          </knx-insurance-result>

          <button *ngIf="insurances && total < insurances.length"
                  class="knx-button knx-button--secondary knx-button--ghost block-center"
                  (click)="showAll()">
            Toon alle
          </button>

          <div class="knx-insurance-toplist__info">
            <span style="cursor: pointer;">
              Hoe komen we tot deze resultaten?
              <knx-tooltip [options]="{ position: 'bottom' }">
                <p>Onze slimme technologie gaat op basis van de door jou opgegeven informatie aan de slag. We vergelijken
                meer dan 20 aanbieders en stellen hier een overzicht uit samen. Daarbij kijken we niet alleen naar de prijs.
                Goede polisvoorwaarden en een dekking die past bij jouw persoonlijke situatie, zijn ook belangrijk.</p>

                <p>In het overzicht staan de profielscore en de prijs-kwaliteitverhouding. De verzekering met de hoogste
                  score – en dus het best bij je past – staat bovenaan. Verzekeringen die je via Knab afsluit, krijg je
                  voor een vast laag percentage.</p>

                <p>Verzekeringen die je niet via ons kunt afsluiten, laten we ook zien. We willen voor jou namelijk de
                  best passende verzekering en daarom is het belangrijk dat jij een zo compleet mogelijk beeld krijgt.
                  We verwijzen je in dat geval door naar de website van de verzekeraar. Wel zo eerlijk.</p>
              </knx-tooltip>
            </span>
          </div>
        </ng-template>
      </div>
    </div>
  </div>
  `
})
export class InsuranceTopListComponent implements OnInit {
  @Input() insurances: Array<InsuranceAdvice>;
  @Input() isLoading: boolean;
  @Input() title: string;
  @Input() totalTitle: number;
  @Input() initialAmount: number;
  @Input() disableInsuranceBuy: boolean;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  total: number;
  orderBy: Array<OrderItem>;

  ngOnInit() {
    this.total = this.initialAmount;
    this.orderBy = [
      { id: 'priceQuality', label: 'Prijs / Kwaliteit', key: 'price_quality', active: true },
      { id: 'price', label: 'Beste Prijs', key: 'monthly_premium', active: false }
    ];
  }

  changeOrderBy(selected: OrderItem) {
    this.orderBy.forEach(orderItem => {
      orderItem.active = orderItem.id === selected.id;
    });
    this.sortByKey(this.insurances, selected.key);
  }

  sortByKey(arr, key) {
    return key ? arr.sort((i1, i2) => {
      if (key === 'price_quality') {
        // highest amount first
        if (i1[key] < i2[key]) {
          return 1;
        }
        if (i1[key] > i2[key]) {
          return -1;
        }
        return 0;
      } else {
        // lowest amount first
        if (i1[key] > i2[key]) {
          return 1;
        }
        if (i1[key] < i2[key]) {
          return -1;
        }
        return 0;
      }
    }) : arr;
  }

  showAll(): void {
    this.total = this.insurances.length;
  }

  trackInsurance(index, item) {
    return item && item.insurance ? item.insurance.id : undefined;
  }

  selectInsurance(event) {
    this.insuranceSelected$.emit(event);
  }

  noResult() {
    return (this.insurances && this.insurances.length <= 0) && !this.isLoading;
  }

}

