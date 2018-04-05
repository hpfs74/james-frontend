import { Component, Input } from '@angular/core';
import { ContactDetails } from '@app/house/models/house-hold-store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'knx-contact-detail',
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent {
  @Input() contact: ContactDetails;
  @Input() collapsible = true;

  constructor(private translateService: TranslateService) {

  }
}

