import { Component, Input } from '@angular/core';
import { ContactDetails } from '@app/house/models/house-hold-store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'knx-contact-detail',
  styleUrls: ['./contact-details.component.scss'],
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent {
  @Input() contact: ContactDetails;
  @Input() collapsible = true;

  constructor(private translateService: TranslateService) {

  }

  getFamilySituation() {
    return 'house_hold_flow_family_situation.' + this.contact.familySituation;
  }
}

