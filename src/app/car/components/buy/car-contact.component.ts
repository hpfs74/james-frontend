import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Profile } from './../../../profile/models';
import { ContactDetailForm } from './../../../shared/forms/contact-detail.form';
import { isMobileNumber } from '../../../utils/base-form.utils';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-contact-form',
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements OnChanges {
  @Input() form: ContactDetailForm;
  @Input() profile: Profile;

  @Input() set advice(value: any) {
    FormUtils.updateAndValidateControls(this.form.formGroup, value);
  }

  @Output() onReset: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (this.profile) {
      // Update validation state of known pre-filled profile fields
      // Note: only seems to get triggered if touched/dirty state is
      // updated on each individual control
      FormUtils.updateAndValidateControls(this.form.formGroup, this.profile);
    }
   }
}
