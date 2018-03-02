import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';


import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AssistantConfig } from '@app/core/models/assistant';
import { TagsService } from '@app/core/services/tags.service';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { KNXWizardRxComponent } from '@app/components/knx-wizard-rx/knx-wizard-rx.component';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import * as FormUtils from '@app/utils/base-form.utils';
import * as fromRoot from '@app/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromCore from '@app/core/reducers';

// Core actions
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

// House hold actions
import * as housedata from '@app/house/actions/house-data';
import * as householdpremiums from '@app/house/actions/house-hold-premium';
import * as householdinsuranceamount from '@app/house/actions/house-hold-insurance-amount';

// reducers
import { getHouseHoldDataInfo } from '@app/house/reducers';
import * as fromInsurance from '@insurance/reducers';
import * as fromHouseHold from '@app/house/reducers';

// Other actions
import * as wizardActions from '@app/core/actions/wizard';
import * as houseHoldData from '@app/house/actions/house-hold-data';


import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { HouseHoldPremiumsFilterForm } from '../house-hold-premiums-filter/house-hold-premiums-filter.form';
import * as router from '@core/actions/router';
import { UIPair } from '@core/models/ui-pair';
import { HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import { TranslateService } from '@ngx-translate/core';


/**
 * the container component that holds all the pages
 * for the premiums flow
 */
@Component({
  templateUrl: 'house-hold-premiums.component.html',
  styleUrls: ['./house-hold-premiums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldPremiumsComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.houseHoldPremiumsRoot;

  pills: UIPair[] = [];
  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  advice$: Observable<HouseHoldPremiumRequest>;

  // State of the advice forms data
  subscription$: Subscription[] = [];

  // Forms
  houseHoldFilterForm: HouseHoldPremiumsFilterForm;

  houseHoldPremiumsSteps = {
    list: 0,
    detail: 1,
    buy: 2,
    thankyou: 3
  };

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private translateService: TranslateService,
              public knxWizardService: KNXWizardRxService) {

    this.subscription$.push(this.translateService
      .get([
        'household.premium.steps.step1.title',
        'household.premium.steps.step2.title',
        'household.premium.steps.step3.title'])
      .subscribe(data => {
        this.formSteps = Object
          .keys(data)
          .map(key => data[key])
          .map(v => ({label: v}));
      }));
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert verzekeringen'
      }
    }));

    // bind observables
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);

    this.advice$ = this.store$.select(fromHouseHold.getHouseHoldDataInfo);

    this.pills = [
      {label: 'Insurance details', value: '#insurance'},
      {label: 'General coverages', value: '#general'},
      {label: 'Documenten', value: '#documenten'}
    ];


    // initialize forms
    const formBuilder = new FormBuilder();
    this.houseHoldFilterForm = new HouseHoldPremiumsFilterForm(formBuilder,
      this.tagsService.getAsLabelValue('house_hold_flow_coverages'));

    this.subscription$.push(this.houseHoldFilterForm.formGroup.valueChanges
        .debounceTime(200)
        .filter(() => this.knxWizardService.currentStepIndex === 0)
        .subscribe(data => {
          this.store$.dispatch(new houseHoldData.Update({
            CoverageCode: data.mainCoverage,
            IncludeOutdoorsValuable: data.outsideCoverage,
            IncludeGlass: data.glassCoverage === true ? 'J' : 'N'
          }));
        }),

      this.store$.select(fromHouseHold.getHouseHoldDataInfo)
        .filter((advice) => advice !== null)
        .subscribe((advice: HouseHoldPremiumRequest) => {

          const payload = {
            Birthdate: advice.BreadWinnerBirthdate,
            CommencingDate: advice.CommencingDate,
            Zipcode: advice.Zipcode,
            HouseNumber: advice.HouseNumber,
            HouseNumberAddition: advice.HouseNumberAddition,
            HouseType: advice.HouseType,
            BuildYear: advice.BuildYear,
            RoomCount: advice.RoomCount,
            SurfaceArea: advice.SurfaceArea,
            ConstructionNature: advice.ConstructionNature,
            ConstructionNatureRoof: advice.ConstructionNatureRoof,
            ConstructionNatureFloor: advice.ConstructionNatureFloor,
            SecurityMeasures: advice.SecurityMeasures,
            OwnedBuilding: advice.OwnedBuilding,
            CoverageCode: advice.CoverageCode,
            FamilyComposition: advice.FamilyComposition,
            IncludeGlass: advice.IncludeGlass,
            BreadWinnerBirthdate: advice.BreadWinnerBirthdate,
            BreadWinnerMonthlyIncome: advice.BreadWinnerMonthlyIncome,
            InsuredAmount: advice.InsuredAmount,
            GuaranteeAgainstUnderinsurance: 'G',
            InsuredAmountValuables: 0,
            IncludeOutdoorsValuable: advice.IncludeOutdoorsValuable
          };

          this.store$.dispatch(new householdpremiums.GetInfo(payload));
        }),
      // set the default value for include glass in insurance
      this.store$.select(fromHouseHold.getHouseHoldDataInfo)
        .filter((advice) => advice !== null && !advice.IncludeGlass)
        .subscribe((advice) => {
          this.store$.dispatch(new houseHoldData.Update({
            IncludeGlass: 'N'
          }));
        }));
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.welcome',
      clear: true
    }));
  }

  /**
   * go back to the advice last page that is dekking
   */
  goBack() {
    this.store$.dispatch(new router.Go({
      path: ['/inboedel/dekking']
    }));
  }

  /**
   * handle the button click on top of the page to go back to result page
   */
  goToList() {
    this.store$.dispatch(new router.Go({
      path: ['/inboedel/advies']
    }));
  }

  /**
   * handle the button click for the detail page
   */
  goToBuy() {
    this.store$.dispatch(new router.Go({path: ['/inboedel/bevestig']}));
  }

}
