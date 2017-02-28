import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle.d';

@Component({
  selector: 'ki-vehicle-info',
  template: `
    <div class="ki-block-round">
      <div class="cx-row">
        <div class="cx-sm-col-12">
          <img src="" alt="vehicle image" border="0"/>
        </div>
      </div>    
      <div class="cx-row">
        <div class="cx-sm-col-6">Merk</div>
        <div class="cx-sm-col-6">{{ vehicle.manufacturer }}</div>
      </div>  
      <div class="cx-row">
        <div class="cx-sm-col-6">Model</div>
        <div class="cx-sm-col-6">{{ vehicle.model }}</div>
      </div>
      <div class="cx-row">
        <div class="cx-sm-col-6">Brandstof</div>
        <div class="cx-sm-col-6">{{ vehicle.engine }}</div>
      </div>
      <div class="cx-row">
        <div class="cx-sm-col-6">Transmissie</div>
        <div class="cx-sm-col-6">{{ vehicle.transmission }}</div>
      </div>
      <div class="cx-row">
        <div class="cx-col-sm-6">Bouwjaar</div>
        <div class="cx-col-sm-6">{{ vehicle.year }}</div>
      </div>      
      <div class="cx-row">
        <div class="cx-col-sm-6">Aanschafwaarde</div>
        <div class="cx-col-sm-6">{{ vehicle.acquisitionValue }}</div>
      </div>
      <div class="cx-row">
        <div class="cx-col-sm-6">Geschatte waarde</div>
        <div class="cx-col-sm-6">{{ vehicle.estimatedValue }}</div>
      </div>
  </div>`
})
export class VehicleInfoComponent {

  @Input() vehicle: Vehicle;
  @Input() comment: string;

}
