import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Car } from '../../car/models';
import { CarPreviewComponent } from './car-preview.component';

@Component({
  selector: 'knx-car-info-message',
  template: `
    <div class="knx-car-info-message container knx-container--fullwidth" *ngIf="data">
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
      <div class="col knx-car-info__item">{{ transmission }}
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
export class CarInfoMessageComponent {
  @Input() data: Car;

  get transmission() {
    return this.data.nicci_cartransmission_manual_transmission ||
      this.data.nicci_cartransmission_automatic_transmission ||
      this.data.transmission_nl;
  }
}
