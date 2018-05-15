import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Content, ContentConfig } from '@app/content.config';

import * as assistant from '@core/actions/assistant';
import * as fromRoot from '@app/reducers';
import * as fromHouseHold from '@app/house/reducers';
import { PackagePremiumResponse, PackagePremiumRequest } from '@app/house/models/package-premium';
import { ContactDetails } from '@app/house/models/house-hold-store';

@Component({
  providers: [AsyncPipe],
  selector: 'knx-house-hold-premiums-thank-you',
  templateUrl: './house-hold-premiums-thank-you.component.html',
  styleUrls: ['./house-hold-premiums-thank-you.component.scss']
})
export class HouseHoldPremiumsThankYouComponent implements OnInit, OnDestroy {
  packagePremiumRequest$: Observable<PackagePremiumRequest>;
  packagePremiumResponse$: Observable<PackagePremiumResponse>;
  subscriptions$: Subscription[] = [];
  content: Content;
  params: any = {};
  newHouseHoldFlowAdvice$: Observable<ContactDetails>;

  constructor(private store$: Store<fromRoot.State>,
              private async: AsyncPipe,
              private contentConfig: ContentConfig) {
    this.content = this.contentConfig.getContent();
  }

  /**
   * events that happens after constructor
   */
  ngOnInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.thankYou',
      clear: true
    }));
    this.newHouseHoldFlowAdvice$ = this.store$.select(fromHouseHold.getHouseHoldNewFlowAdviceContact);
    this.packagePremiumRequest$ = this.store$.select(fromHouseHold.getPackagePremiumRequest);
    this.packagePremiumResponse$ = this.store$.select(fromHouseHold.getPackagePremiumResponse);

    this.setInitialSubscriptions();
  }

  /**
   * run unsubscripton
   */
  ngOnDestroy() {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  /**
   * it is a place where all subscription happens and
   * get stored in subscription array for later unsubscribtion
   */
  setInitialSubscriptions() {
    this.subscriptions$.push(
      this.newHouseHoldFlowAdvice$.subscribe(x => {
        this.params.CustomerName = x.firstName;
        this.params.customerEmail = x.email;
      }),
      this.packagePremiumResponse$.subscribe(x => {
        this.params.packageNumber = x.PackageNumber;
        this.params.commencingDate = x.CommencingDate;
        this.params.companyName = x.HouseholdInsurances[0].CompanyName;
        this.params.InsuranceCompanyName = x.HouseholdInsurances[0].CompanyName;
      })
    );
  }

}
