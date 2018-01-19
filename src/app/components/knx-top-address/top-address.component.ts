import { Component, Input, OnInit } from '@angular/core';
import { collapseInOutAnimation } from '@app/shared/animations';
import * as fromRoot from '@app/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Address } from '@app/address/models';
import * as fromAddress from '@app/address/reducers';

@Component({
  selector: 'knx-top-address',
  templateUrl: './top-address.component.html',
  styleUrls: ['./top-address.component.scss'],
  animations: [collapseInOutAnimation]
})
export class TopAddressComponent  {
  @Input() address: Address;
}
