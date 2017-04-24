import { Component } from '@angular/core';

@Component({
  selector: 'knx-license-plate',
  template: `
  <div class="licenseplate">
    <div class="country">NL</div>
    <input type="text" class="license-number" placeholder="AAA-11-B">
  </div>
  `
})
export class LicensePlateComponent {

}
