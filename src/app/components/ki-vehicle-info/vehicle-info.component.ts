import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({

  selector: 'ki-vehicle-info',
  styleUrls: ['vehicle-info.component.scss'],
  template: `
  <div class="ki-block-round" [@flyInOut]="'in'">      
    <div class="cx-container-fluid">
    
      <div class="cx-row">
        <div class="cx-col-sm-12">Molto bello! Mooie auto die <b>{{ vehicle.manufacturer }} {{ vehicle.name }} {{ vehicle.model }}</b></div>
      </div>  
    
      <div class="cx-row">
        <div class="cx-col-sm-12">
          <img alt="vehicle image" border="0" 
               src="/assets/images/cars/{{ vehicle.manufacturer | lowercase }}/{{ vehicle.name | lowercase }}.jpg" />
        </div>
      </div>
      <div class="cx-row">
        <div class="cx-col-sm-6">Merk</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.manufacturer }} {{ vehicle.name }}</div>
      </div>
      <div class="cx-row">
        <div class="cx-col-sm-6">Model</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.model }}</div>
      </div>
      <div class="cx-row" *ngIf="vehicle.engine">
        <div class="cx-col-sm-6">Brandstof</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.engine }}</div>
      </div>
      <div class="cx-row" *ngIf="vehicle.transmission">
        <div class="cx-col-sm-6">Transmissie</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.transmission }}</div>
      </div>
      <div class="cx-row" *ngIf="vehicle.year">
        <div class="cx-col-sm-6">Bouwjaar</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.year }}</div>
      </div>
      <div class="cx-row" *ngIf="vehicle.acquisitionValue">
        <div class="cx-col-sm-6">Aanschafwaarde</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.acquisitionValue | currency }}</div>
      </div>
      <div class="cx-row" *ngIf="vehicle.estimatedValue">
        <div class="cx-col-sm-6">Geschatte waarde</div>
        <div class="cx-col-sm-6 ki-block-round__cartext">{{ vehicle.estimatedValue | currency }}</div>
      </div>
      </div>
  </div>`,
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
      ]),
      transition('* => void', [
        animate('0.4s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class VehicleInfoComponent {

  @Input() vehicle: Vehicle;
  @Input() comment: string;
  @Input() state: string ;
}
