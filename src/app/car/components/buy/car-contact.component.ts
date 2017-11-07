import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { QaIdentifier } from './../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../shared/models/qa-identifiers';

import { Profile } from './../../../profile/models';
import { ContactDetailForm } from './../../../shared/forms/contact-detail.form';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  selector: 'knx-car-contact-form',
  styleUrls: ['./car-contact.component.scss'],
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements OnChanges, QaIdentifier {
  qaRootId = QaIdentifiers.carContact;

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

  resetAdvice() {
    this.onReset.emit('resetAdvice');
  }
}
