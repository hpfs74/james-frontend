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

// models
import { HouseHoldData } from '@app/house/models/house-hold-data';

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


/**
 * HouseHoldPremiumsComponent
 *
 *
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
  advice$: Observable<HouseHoldData>;
  houseHoldData$: Observable<HouseHoldData>;

  // State of the advice forms data
  subscription$: Subscription[] = [];

  // Forms
  houseHoldFilterForm: HouseHoldPremiumsFilterForm;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              public knxWizardService: KNXWizardRxService) {

    this.formSteps = ['Premiums list', 'Premium detail', 'Premium buy'].map(el => {
      return {label: el};
    });
    this.houseHoldData$ = this.store$.select(getHouseHoldDataInfo);

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

    const coverageTags: UIPair[] = [
      {label: 'Default', value: '1'},
      {label: 'Extended', value: '2'}
    ];

    // initialize forms
    const formBuilder = new FormBuilder();
    this.houseHoldFilterForm = new HouseHoldPremiumsFilterForm(formBuilder, coverageTags);

    this.houseHoldFilterForm.formGroup.valueChanges
      .debounceTime(200)
      .filter(() => this.knxWizardService.currentStepIndex === 0)
      .subscribe(data => {
        this.store$.dispatch(new houseHoldData.Update({
          Coverage: data.mainCoverage,
          OutsideCoverage: data.outsideCoverage,
          GlassCoverage: data.glassCoverage
        }));
      });

    this.store$.select(fromHouseHold.getHouseHoldDataInfo)
      .subscribe((advice: HouseHoldData) => {

        const tomorrow = new Date();
        const dateOfBirth = new Date(1974, 10, 4);

        const payload = {
          Birthdate: FormUtils.toRiskDate(dateOfBirth),
          CommencingDate: FormUtils.toRiskDate(tomorrow),
          Zipcode: '2273DE',
          HouseNumber: 200,
          HouseNumberAddition: '',
          HouseType: advice.BuildingType,
          BuildYear: advice.BuildYear,
          RoomCount: advice.RoomCount,
          SurfaceArea: advice.SurfaceArea,
          ConstructionNature: advice.WallsTitle,
          ConstructionNatureRoof: advice.RoofMaterial,
          ConstructionNatureFloor: advice.SecondFloor,
          SecurityMeasures: advice.Security,
          OwnedBuilding: advice.OwnedBuilding ? 'J' : 'N',
          CoverageCode: advice.Coverage,
          FamilyComposition: advice.FamilySituation,
          IncludeGlass: advice.GlassCoverage === 'true' ? 'J' : 'N',
          BreadWinnerBirthdate: FormUtils.toRiskDate(dateOfBirth),
          BreadWinnerMonthlyIncome: advice.NetIncomeRange,
          InsuredAmount: 10000,
          GuaranteeAgainstUnderinsurance: 'G',
          InsuredAmountValuables: 0,
          IncludeOutdoorsValuable: advice.OutsideCoverage ? 'J' : 'N'
        } as HouseHoldPremiumRequest;


        this.store$.dispatch(new householdpremiums.GetInfo(payload));
      });
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  goBack() {
    this.store$.dispatch(new router.Go({path: ['/household/dekking']}));
  }

  goListBack() {
    this.store$.dispatch(new router.Go({path: ['/household/premiums/list']}));
  }

  goDetail() {
    this.store$.dispatch(new router.Go({path: ['/household/premius/detail']}));
  }
}
