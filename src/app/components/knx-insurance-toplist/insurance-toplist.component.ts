import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../models';

interface OrderItem {
  id: string;
  label: string;
  key: string;
  active: boolean;
}

@Component({
  selector: 'knx-insurance-toplist',
  template: `
  <div class="knx-insurance-toplist">
    <div class="row">
      <div class="col-sm-12">
        <h2>De beste verzekeringen van alle {{total}} aanbieders</h2>

        <div class="knx-button-group" role="group">
          <button
            *ngFor="let item of orderBy"
            class="knx-button knx-button--toggle"
            [class.knx-button--toggle-active]="item.active"
            (click)="changeOrderBy(item)">{{ item.label }}
          </button>
        </div>

        <div *ngIf="isLoading; else insuranceResults">
          <knx-loader [visible]="isLoading">
            Bezig met ophalen van verzekeringen...
          </knx-loader>
        </div>
        <ng-template #insuranceResults>
          <knx-insurance-result
            *ngFor="let item of insurances | slice:0:total; let i = index; trackBy: trackInsurance"
            [insurance]="item" [index]="i" (insuranceSelected$)="selectInsurance($event)" [disableButton]="disableInsuranceBuy">
          </knx-insurance-result>

          <button *ngIf="insurances && total < insurances.length" class="knx-button knx-button--primary block-center" (click)="showAll()">
            Toon all verzekeringen
          </button>

          <div class="knx-insurance-toplist__info">
            <knx-info infoLabel="Hoe komen we tot deze resultaten?" class="knx-info">
              <div class="knx-info__content">
                <div class="knx-message knx-message--arrow-top">
                  <div class="knx-message__content">
                    <p>
                      Op basis van de informatie die jij over jezelf gaf, gaat onze slimme technologie voor je werken.
                      We zoeken bij meer dan 30 aanbieders en stellen een overzicht samen.
                      Daarbij kijken we niet alleen naar prijs. Want geode polisvoorwaarden en een dekking die past bij
                      jouw persoonlijke situatie zijn ook belangrijk.
                    </p>
                    <p>
                      Profielscore en prijs-kwaliteit
                      In het overzicht zie je een profielscore en prijs-kwaliteitscore. De verzekering met de hoogste
                      profielscore - de verzekering die het best bij jou past – staat vooraan. Verzekeringen
                      die je via Knab afsluit, regel je direct tegen een vast lag percentage.
                      Verzekeringen die je niet via ons kunt afsluiten, laten we toch zien. We verwijzen je dan naar de
                      website van de verzekeraar. Zo heb je altijd een compleet beeld van wat er te koop is.
                      Wel zo eerlijk natuurlijk.
                    </p>
                  </div>
                </div>
              </div>
            </knx-info>
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
  @Input() stepAmount: number;
  @Input() disableInsuranceBuy: boolean;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  total: number;
  orderBy: Array<OrderItem>;

  ngOnInit() {
    this.total = this.stepAmount || 4;
    this.orderBy = [
      { id: 'priceQuality', label: 'prijs / kwaliteit', key: 'price_quality', active: true },
      { id: 'price', label: 'beste prijs', key: 'monthly_premium', active: false }
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
}

