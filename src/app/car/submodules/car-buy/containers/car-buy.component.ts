import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AssistantConfig } from '@app/core/models/assistant';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { TagsService } from '@app/core/services/tags.service';
import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

import * as fromCar from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromCore from '@app/core/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as car from '@app/car/actions/car';
import * as wizardActions from '@app/core/actions/wizard';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { SharedService, TEMP_VARIABLE_KEYS } from '@app/shared/services/shared.service';
import { InsuranceAdvice } from '@insurance/models';
import { JamesTagPipe } from '@app/shared/pipes';
import { KNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';
import 'rxjs/add/operator/filter';

@Component({
  providers: [AsyncPipe, JamesTagPipe, CurrencyPipe],
  selector: 'knx-car-buy',
  templateUrl: 'car-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarBuyComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.carBuyRoot;
  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  advice$: Observable<any>;
  knxFinalAdviceOptions: KNXFinalAdviceOptions;
  subscription$: Array<any> = [];


  constructor(private store$: Store<fromCar.State>,
              private tagsService: TagsService,
              public asyncPipe: AsyncPipe,
              private jamesTag: JamesTagPipe,
              private currencyPipe: CurrencyPipe,
              public knxWizardService: KNXWizardRxService,
              public sharedService: SharedService) {

    this.setFinalAdviceOptions();
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert autoverzekeringen'
      }
    }));
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    let advice = this.asyncPipe.transform(this.advice$);
    this.formSteps = [
      {
        label: 'Contactgegevens',
      },
      {
        label: 'Autogegevens',
      },
      {
        label: 'Check',
      },
      {
        label: 'Betaling',
      },
      {
        label: 'Overzicht',
      }
    ];
    this.checkFlow();
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
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
                value: this.currencyPipe.transform(selectedInsurance.monthly_premium, 'EUR', true)
              }
            ],
            button: {
              text: selectedInsurance.supported ? 'vraag direct aan' : 'Ga naar website',
              pending: false,
              onClick: () => {
              },
              classes: ['knx-button', 'knx-button--primary', 'knx-button--3d', 'knx-button--float-bottom']
            }
          };
        })
    );
  }

  /**
   * if car flow is set for any reason,
   * for now only used for reset flow,
   * on this point set it back to false, so you can continue as usual
   */
  private checkFlow() {
    this.sharedService.tempVariables.set(TEMP_VARIABLE_KEYS.carFlow, false);
  }
}
