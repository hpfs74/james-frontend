import { Component, Input } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  providers: [TranslatePipe],
  selector: 'knx-house-hold-card-extension',
  styleUrls: ['./house-hold-card-extension.component.scss'],
  templateUrl: './house-hold-card-extension.component.html'
})
export class HouseHoldCardExtensionComponent {

  @Input() insurance: CalculatedPremium;
}
