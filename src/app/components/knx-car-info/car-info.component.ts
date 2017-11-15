import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Car } from '../../car/models';
import { CarPreviewComponent } from './car-preview.component';

@Component({
  selector: 'knx-car-info',
  styleUrls: ['./car-info.component.scss'],
  template: `
    <div class="knx-car-info container knx-container--fullwidth" *ngIf="data">
      <div class="row" *ngIf="data">
        <div class="col">Merk</div>
        <div class="col knx-car-info__item">{{ data.make | uppercase  }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Model</div>
        <div class="col knx-car-info__item">{{ data.model | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Kleur</div>
        <div class="col knx-car-info__item">{{ data.color | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Brandstof</div>
        <div class="col knx-car-info__item">{{ data.fuel }}</div>
      </div>
      <div class="row" *ngIf="data">
      <div class="col">Transmissie</div>
      <div class="col knx-car-info__item">{{ getTransmission(data) }}
      </div>
    </div>
      <div class="row" *ngIf="data">
        <div class="col">Bouwjaar</div>
        <div class="col knx-car-info__item">{{ data.year }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Aanschafwaarde</div>
        <div class="col knx-car-info__item">{{ data.price_consumer_incl_vat | currency:'EUR':true:'1.0' }}</div>
      </div>
      <div class="row" *ngIf="data">
        <div class="col">Dagwaarde</div>
        <div class="col knx-car-info__item">{{ data.current_value | currency:'EUR':true:'1.0' }}</div>
      </div>
    </div>
  `
})
export class CarInfoComponent {
  @Input() data: Car;

  getTransmission(data) {
    return data.nicci_cartransmission_manual_transmission ||
      data.nicci_cartransmission_automatic_transmission ||
      data.transmission_nl;
  }
}
