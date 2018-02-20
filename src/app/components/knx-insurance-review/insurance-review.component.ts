import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { InsuranceAdvice } from '../../insurance/models';
import { CarInsurance } from '../../car/models';
import { JamesTagPipe } from '@app/shared/pipes';
import { KNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import 'rxjs/add/operator/filter';

@Component({
  providers: [JamesTagPipe, CurrencyPipe],
  selector: 'knx-insurance-review',
  styleUrls: ['./insurance-review.component.scss'],
  templateUrl: './insurance-review.component.html'
})
export class InsuranceReviewComponent {
  @Input() selectedInsurance: InsuranceAdvice;
  knxFinalAdviceOptions: KNXFinalAdviceOptions;
  subscription$: Subscription[] = [];
  constructor(private store$: Store<fromRoot.State>,
              private jamesTag: JamesTagPipe,
              private currencyPipe: CurrencyPipe) {
    this.setFinalAdviceOptions();
  }

  private setFinalAdviceOptions() {
    this.subscription$.push(
      this.store$.select(fromInsurance.getSelectedInsurance)
        .filter(selectedInsurance => !!selectedInsurance)
        .subscribe((selectedInsurance: InsuranceAdvice) => {
          this.knxFinalAdviceOptions = {
            sections: [
              {
                logoUrl: selectedInsurance._embedded.insurance.insurance_logo,
                divider: true
              },
              {
                heading: selectedInsurance['product_name'],
                key: this.jamesTag.transform(selectedInsurance['main_coverage'], 'car_flow_coverage'),
                divider: true
              },
              {
                key: 'Eenmalige afsluitkosten',
                value: this.currencyPipe.transform(selectedInsurance['one_off_premium'], 'EUR', true)
              },
              {
                key: 'Per maand',
                value: this.currencyPipe.transform(selectedInsurance.monthly_premium, 'EUR', true),
                divider: true
              }
            ],
            button: {
              text: 'vraag direct aan',
              pending: false,
              onClick: () => {}
            }
          };
        })
    );
  }
}
