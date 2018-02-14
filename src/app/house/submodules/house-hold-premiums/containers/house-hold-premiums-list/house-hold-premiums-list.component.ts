import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AsyncPipe } from '@angular/common';


// core
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

// reducers
import * as fromRoot from '@app/reducers';
import * as router from '@app/core/actions/router';
import * as fromCore from '@app/core/reducers';
import * as fromHouse from '@app/house/reducers';

// actions
import * as wizardActions from '@app/core/actions/wizard';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';
import * as householddata from '@app/house/actions/house-hold-data';

// models
import { CalculatedPremium, HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';
import { Insurance, InsuranceAdvice } from '@insurance/models';
import 'rxjs/add/operator/filter';


@Component({
  providers: [AsyncPipe],
  selector: 'knx-house-hold-premiums-list',
  templateUrl: './house-hold-premiums-list.component.html',
  styleUrls: ['./house-hold-premiums-list.component.scss']
})
export class HouseHoldPremiumsListComponent implements OnInit {
  houseInsurances: CalculatedPremium[];
  insurances: Array<InsuranceAdvice> = [];
  title: string;
  totalTitle: number;
  initialAmount = 4;
  disableInsuranceBuy: boolean;
  isPremiumsLoading$: Observable<boolean>;
  premiums$: Observable<HouseHoldPremiumResponse>;
  total: number;
  currentStepOptions: KNXWizardStepRxOptions;

  qaRootId = QaIdentifiers.carAdviceRoot;
  subscription$: Array<any>;

  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe) {

    this.getCompareResultCopy();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.premiums', clear: true}));

    this.currentStepOptions = {
      label: 'Premiums list'
    };
    this.total = this.initialAmount;
    // this.error$ = this.store$.select(fromHouse.getHouseHoldPremiumError);
  }

  ngOnInit(): void {

    this.isPremiumsLoading$ = this.store$.select(fromHouse.getHouseHoldPremiumLoading);
    this.premiums$ = this.store$.select(fromHouse.getHouseHoldPremiumResult);

    this.premiums$
      .filter(data => data !== null)
      .subscribe((data) => {
        this.houseInsurances = data.CalculatedPremiums;
        if (this.houseInsurances) {
          this.insurances = this.houseInsurances.map(this.fromHouseToInsuranceAdvice);
        }
      });
  }

  showAll(): void {
    this.total = this.insurances.length;
  }

  trackInsurance(index, item): any {
    // return item && item.insurance ? item.insurance.id : undefined;
    return item && item.insurance_name;
  }

  selectInsurance(insurance: InsuranceAdvice): void {
    const houseInsurance = this.houseInsurances.filter((ins) => ins.Identifier === insurance.id)[0];

    this.store$.dispatch(new householddata.UpdateAdvice(houseInsurance));
    this.store$.dispatch(new router.Go({path: ['/household/premiums/detail']}));
  }

  noResult(): boolean {
    return this.insurances.length <= 0 && !this.asyncPipe.transform(this.isPremiumsLoading$);
  }

  private getCompareResultCopy() {
    // This is needed because the ngrx-datatable modifies the result to add an $$index to each
    // result item and modifies the source array order when sorting
    // this.store$.select(getHouseHoldPremiumResult)
    //   .map(obs => {
    //     return obs.map(v => JSON.parse(JSON.stringify(v)));
    //   }).subscribe(insurances => {
    //   this.insurances = insurances;
    // });

    // this.store$.select(fromInsurance.getSelectedAdvice)
    //   .filter(advice => advice !== undefined && Object.keys(advice).length > 1) // bit hackisch way to check for valid compare request
    //   .subscribe(advice => {
    //     this.store$.dispatch(new compare.LoadCarAction(advice));
    //   });
  }

  fromHouseToInsuranceAdvice(source: CalculatedPremium): InsuranceAdvice {
    if (!source) {
      return null;
    }

    return {
      id: source.Identifier,
      logo: source.CompanyLogoUrl,
      price: source.ValuablesInsuredAmount,
      own_risk: source.Deductables,
      monthly_premium: source.Premium,
      advice_expires_at: Date.now(),
      insurance_id: source.CompanyName,
      insurance_name: source.CompanyName,
      supported: true
    };
  }

}

