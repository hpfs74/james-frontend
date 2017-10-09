import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Car } from '../../car/models';
import { CarPreviewComponent } from './car-preview.component';

@Component({
  selector: 'knx-car-info-message',
  template: `
  <div class="knx-car-info-message knx-message knx-message--hint knx-message--arrow-top">
    <div class="container knx-container--fullwidth">
      <knx-loader [visible]="loading">
        Ophalen van autogegevens...
      </knx-loader>

      <div class="row" *ngIf="data">
        <div class="col">Merk</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.make | uppercase  }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Model</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.model | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Kleur</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.color | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Brandstof</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.fuel }}</div>
      </div>
      <div class="row" *ngIf="data">
      <div class="col">Transmissie</div>
      <div class="col knx-car-info__item" *ngIf="data">{{ transmission }}
      </div>
    </div>
      <div class="row" *ngIf="data">
        <div class="col">Bouwjaar</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.year }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Aanschafwaarde</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.price_consumer_incl_vat | currency:'EUR':true:'1.0' }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Dagwaarde</div>
        <div class="col knx-car-info__item" *ngIf="data">{{ data.current_value | currency:'EUR':true:'1.0' }}</div>
      </div>
    </div>
  </div>
  `
})
export class CarInfoMessageComponent {
  @Input() data: Car;
  @Input() loading: boolean;

  get transmission() {
    return this.data.nicci_cartransmission_manual_transmission ||
      this.data.nicci_cartransmission_automatic_transmission ||
      this.data.transmission_nl;
  }
}
