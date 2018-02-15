import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TagsService } from '@app/core/services/tags.service';

import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as householdinsuranceamount from '@app/house/actions/house-hold-insurance-amount';

import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { Price } from '@app/shared/models';
import { HouseHoldDekkingForm } from './house-hold-dekking.form';
import * as fromHouse from '@app/house/reducers';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';
import { Subscription } from 'rxjs/Subscription';
import { getHouseHoldDataInfo } from '@app/house/reducers';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import { HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'knx-house-hold-dekking-form',
  styleUrls: ['./house-hold-dekking.component.scss'],
  templateUrl: 'house-hold-dekking.component.html'
})
export class HouseHoldDekkingComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldDekking;
  form: HouseHoldDekkingForm;
  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  coverages: Price[];
  isAmountLoaded$: Observable<boolean>;
  isAmountLoading$: Observable<boolean>;
  amount$: Observable<HouseHoldAmountResponse>;
  insuredAmount: number;
  houseHoldData$: Observable<HouseHoldPremiumRequest>;
  subscriptions$: Subscription[] = [];

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {

    this.coverages = tagsService
      .getByKey('house_hold_flow_coverages')
      .map((el) => {
        return JSON.parse(el.tag) as Price;
      });

    this.currentStepOptions = {
      label: 'Dekking',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Toon resultaat',
      hideBackButton: false,
      hideNextButton: false
    };

    this.initializeForms();
    this.selectInitalStates();
    this.setIntialSubscription();
  }

  selectInitalStates(): void {

    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldDekkingForm(formBuilder,
      this.tagsService.getAsLabelValue('house_hold_flow_net_income_range'),
      this.tagsService.getAsLabelValue('house_hold_flow_family_situation'));
  }

  setIntialSubscription() {
    this.isAmountLoading$ = this.store$.select(fromHouse.getHouseHoldAmountLoading);
    this.isAmountLoaded$ = this.store$.select(fromHouse.getHouseHoldAmountLoaded);
    this.amount$ = this.store$.select(fromHouse.getHouseHoldAmountResult);
    this.amount$
      .filter(data => data !== null)
      .subscribe(data => {
        this.insuredAmount = data.InsuredAmount;
      });

    this.houseHoldData$ = this.store$.select(getHouseHoldDataInfo);
    this.houseHoldData$
      .subscribe(data => this.setFormValue(data));
  }

  /**
   * update the form value
   *
   * @param value
   */
  setFormValue(value: HouseHoldPremiumRequest) {
    if (value) {
      if (value.CoverageCode !== null) {
        this.coverages.forEach((el) => {
          el.selected = +el.id === value.CoverageCode;
        });
        this.form.formGroup.patchValue({coverage: value.CoverageCode});
      }
      if (value.IncludeOutdoorsValuable !== null) {
        this.form.formGroup.patchValue({outsideCoverage: value.IncludeOutdoorsValuable});
      }
      if (value.BreadWinnerMonthlyIncome !== null) {
        this.form.formGroup.patchValue({netIncomeRange: value.BreadWinnerMonthlyIncome});
      }
      if (value.BreadWinnerBirthdate !== null) {
        this.form.formGroup.patchValue({dateOfBirth: value.BreadWinnerBirthdate});
      }
      if (value.FamilyComposition !== null) {
        this.form.formGroup.patchValue({familySituation: value.FamilyComposition});
      }
      if (value.CommencingDate !== null) {
        this.form.formGroup.patchValue({commencingDate: value.CommencingDate});
      }
    }
  }

  ngAfterViewInit(): void {
    // set form validators after the view has been fully loaded, otherwise it is getting an error
    this.setFormAsyncValidators();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  setFormAsyncValidators(): void {
    this.subscriptions$ = [
      this.form.formGroup.valueChanges
        .subscribe(() => {
          if (this.form.formGroup.valid) {

            const detailForm = this.form.formGroup;

            this.houseHoldData$.subscribe((data: HouseHoldPremiumRequest) => {

              const payload = {
                OwnedBuilding: data.OwnedBuilding,
                FamilyComposition: detailForm.value.familySituation,
                AmountMoreThan12KAudioVisualComp: 0,
                AmountMoreThan6KJewelry: 0,
                AmountMoreThan15KSpecialPossesion: 0,
                BreadWinnerBirthdate: detailForm.value.dateOfBirth,
                BreadWinnerMonthlyIncome: detailForm.value.netIncomeRange
              } as HouseHoldAmountRequest;

              this.store$.dispatch(new householdinsuranceamount.GetInfo(payload));
            });
          }
        })
    ];
  }

  /**
   * close all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  /**
   * update the form field related to the coverage
   * @param event
   */
  updateSelectedCoverage(event: Price) {
    this.form.formGroup.patchValue({
      coverage: event.id
    });
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  /**
   * check if the form is valid and move to the next step
   * @param event
   */
  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;

    FormUtils.validateForm(detailForm);

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    this.store$.dispatch(new houseHoldData.Update({
      CoverageCode: detailForm.value.coverage,
      IncludeOutdoorsValuable: detailForm.value.outsideCoverage,
      BreadWinnerMonthlyIncome: detailForm.value.netIncomeRange,
      BreadWinnerBirthdate: detailForm.value.dateOfBirth,
      FamilyComposition: detailForm.value.familySituation,
      InsuredAmount: this.insuredAmount,
      CommencingDate: detailForm.value.commencingDate
    }));

    this.store$.dispatch(new router.Go({path: ['/household/premiums']}));
  }
}
