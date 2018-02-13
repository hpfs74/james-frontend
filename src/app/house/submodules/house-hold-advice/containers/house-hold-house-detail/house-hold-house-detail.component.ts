import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TagsService } from '@app/core/services/tags.service';


import * as fromRoot from '@app/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';

import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { HouseHoldHouseDetailForm } from './house-hold-house-detail.form';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import { getHouseHoldDataInfo } from '@app/house/reducers';

@Component({
  selector: 'knx-house-hold-house-detail-form',
  styleUrls: ['./house-hold-house-detail.component.scss'],
  templateUrl: 'house-hold-house-detail.component.html'
})
export class HouseHoldHouseDetailComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldHouseDetail;
  form: HouseHoldHouseDetailForm;
  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;


  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {
    this.initializeForms();
    this.selectInitalStates();
    this.setInitialSubscription();

    this.currentStepOptions = {
      label: 'Huis details',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Dekking',
      hideBackButton: false,
      hideNextButton: false
    };

  }

  selectInitalStates(): void {
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldHouseDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('house_hold_flow_walls_title'),
      this.tagsService.getAsLabelValue('house_hold_flow_roof_material'),
      this.tagsService.getAsLabelValue('house_hold_flow_second_floor'),
      this.tagsService.getAsLabelValue('house_hold_flow_security'));
  }

  setInitialSubscription() {
    this.store$.select(getHouseHoldDataInfo)
      .subscribe(data => this.setFormValue(data));
  }

  setFormValue(value) {
    if (value) {
      if (value.WallsTitle) {
        this.form.formGroup.patchValue({'wallsTitle': value.WallsTitle});
      }

      if (value.RoofMaterial) {
        this.form.formGroup.patchValue({'roofMaterial': value.RoofMaterial});
      }

      if (value.SecondFloor) {
        this.form.formGroup.patchValue({'secondFloor': value.SecondFloor});
      }

      if (value.Security) {
        this.form.formGroup.patchValue({'security': value.Security});
      }
    }
  }

  ngAfterViewInit(): void {
    // set form validators after the view has been fully loaded, otherwise it is getting an error
    this.setFormAsyncValidators();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  setFormAsyncValidators(): void {
  }

  /**
   * close all subscriptions
   */
  ngOnDestroy(): void {

  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;

    FormUtils.validateForm(detailForm);

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    this.store$.dispatch(new houseHoldData.Update({
      WallsTitle: detailForm.value.wallsTitle,
      RoofMaterial: detailForm.value.roofMaterial,
      SecondFloor: detailForm.value.secondFloor,
      Security: detailForm.value.security
    }));

    this.store$.dispatch(new wizardActions.Forward());
  }
}
