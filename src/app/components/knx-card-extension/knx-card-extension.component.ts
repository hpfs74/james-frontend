import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'knx-card-extension',
  styleUrls: ['./knx-card-extension.component.scss'],
  templateUrl: './knx-card-extension.component.html'
})
export class KnxCardExtensionComponent {
  @Input() selectedInsurance: any;
}
