import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Car } from '../../models/car';
import { CarPreviewComponent } from './car-preview.component';

@Component({
  selector: 'knx-car-info-message',
  template: `
  <div class="knx-car-info-message knx-message knx-message--hint knx-message--arrow-top">
    <div class="container knx-container--fullwidth">
        <div class="row">
          <div class="col-sm-6">Merk</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.make | uppercase  }}</div>
        </div>
        <div class="row">
          <div class="col-sm-6">Model</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.model | uppercase }}</div>
        </div>
        <div class="row" *ngIf="data.color">
          <div class="col-sm-6">Kleur</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.color | uppercase }}</div>
        </div>
        <div class="row" *ngIf="data.fuel">
          <div class="col-sm-6">Brandstof</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.fuel }}</div>
        </div>
        <div class="row" *ngIf="transmission">
        <div class="col-sm-6">Transmissie</div>
        <div class="col-sm-6 knx-car-info__item">{{ transmission }}
        </div>
      </div>
        <div class="row" *ngIf="data.year">
          <div class="col-sm-6">Bouwjaar</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.year }}</div>
        </div>
        <div class="row" *ngIf="data.price_consumer_incl_vat">
          <div class="col-sm-6">Aanschafwaarde</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.price_consumer_incl_vat | currency:'EUR':true }}</div>
        </div>
        <div class="row" *ngIf="data.current_value">
          <div class="col-sm-6">Dagwaarde</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.current_value | currency:'EUR':true }}</div>
      </div>
      </div>
    </div>
  `
})
export class CarInfoMessageComponent {
  @Input() data: Car;

  get transmission() {
    return this.data.nicci_cartransmission_manual_transmission ||
      this.data.nicci_cartransmission_automatic_transmission ||
      this.data.transmission_nl;
  }
}
