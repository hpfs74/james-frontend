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

import { Address } from '@app/address/models';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { HouseHoldHouseTypeForm } from './house-hold-house-type.form';
import { getHouseDataAddress, getHouseHoldDataInfo } from '@app/house/reducers';
import * as houseDataActions from '@app/house/actions/house-data';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import { Subscription } from 'rxjs/Subscription';
import { HouseHoldData } from '@app/house/models/house-hold-data';
import { UIPair } from '@core/models/ui-pair';

@Component({
  selector: 'knx-house-hold-house-type-form',
  styleUrls: ['./house-hold-house-type.component.scss'],
  templateUrl: 'house-hold-house-type.component.html'
})
export class HouseHoldHouseTypeComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldHouseType;
  form: HouseHoldHouseTypeForm;
  advice$: Observable<any>;
  subscriptions: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  address: Address;
  alive: boolean;
  roomValues: UIPair[];

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {


    this.initializeForms();
    this.selectInitialStates();
    this.setInitialSubscriptions();

    // set the wizard configuration
    this.currentStepOptions = {
      label: 'Huis type',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Huis details',
      hideBackButton: false,
      hideNextButton: false
    };

  }

  selectInitialStates(): void {
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  setInitialSubscriptions(): void {
    this.subscriptions = [
      this.store$.select(getHouseDataAddress)
        .subscribe(data => {
          this.address = Object.assign({}, data);
        }),

      this.store$.select(getHouseHoldDataInfo)
        .subscribe(data => this.setFormValue(data))
    ];
  }

  initializeForms(): void {
    this.roomValues = this.tagsService.getAsLabelValue('house_hold_flow_rooms_count');

    const formBuilder = new FormBuilder();
    this.form = new HouseHoldHouseTypeForm(formBuilder, this.roomValues,
      this.tagsService.getAsLabelValue('house_hold_flow_surface_area'),
      this.tagsService.getAsLabelValue('house_hold_flow_building_type'),
      this.tagsService.getAsLabelValue('house_hold_flow_build_year'));
  }

  /**
   * update the form value
   *
   * @param value
   */
  setFormValue(value: HouseHoldData) {
    if (value) {
      if (value.RoomCount !== null) {
        this.form.formGroup.patchValue({roomsCount: value.RoomCount});
      }
      if (value.SurfaceArea !== null) {
        this.form.formGroup.patchValue({surfaceArea: value.SurfaceArea});
      }
      if (value.BuildingType !== null) {
        this.form.formGroup.patchValue({buildingType: value.BuildingType});
      }
      if (value.BuildYear !== null) {
        this.form.formGroup.patchValue({buildYear: value.BuildYear});
      }
    }
  }

  updateRoomsCount(index) {
    this.form.formGroup.patchValue({
      roomsCount: this.roomValues[index].value
    });
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
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
      RoomCount: detailForm.value.roomsCount,
      SurfaceArea: detailForm.value.surfaceArea,
      BuildingType: detailForm.value.buildingType,
      BuildYear: detailForm.value.buildYear
    }));
    this.store$.dispatch(new wizardActions.Forward());
  }
}
