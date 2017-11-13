import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { QaIdentifier } from './../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../shared/models/qa-identifiers';

import * as FormUtils from '../../../utils/base-form.utils';
import { CarReportingCodeForm } from './car-reporting-code.form';
import { Profile } from '../../../profile/models';
import { Car, CarInsurance } from '../../../car/models';
import { TagsService } from '../../../core/services/tags.service';
import { Tag } from '../../../core/models/tag';

@Component({
  selector: 'knx-car-reporting-code-form',
  templateUrl: 'car-reporting-code.component.html'
})
export class CarReportingCodeComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carReporting;

  @Input() form: CarReportingCodeForm;
  @Input() profile: Profile;
  @Input() insurance: CarInsurance;

  @Input()
  set advice(value: any) {
    if (value) {
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
    }
  }

  selectedSecurityClass: Tag;
  securityClasses: Array<Tag>;

  constructor(private tagsService: TagsService) {
    this.securityClasses = this.tagsService.getByKey('buyflow_carsecurity');
  }

  ngOnInit() {
    if (this.securityClasses) {
      this.form.formGroup.get('securityClass').valueChanges.subscribe((value) => {
        if (this.securityClasses instanceof Array) {
          this.selectedSecurityClass = this.securityClasses.filter(i => i.tag === value)[0];
        }
      });
    }
  }
}
