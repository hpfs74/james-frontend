import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AssistantConfig } from '../../../../core/models/assistant';
import { ChatMessage } from '../../../../components/knx-chat-stream/chat-message';
import { ContactDetailForm } from '../../../../shared/forms/contact-detail.form';
import { CarReportingCodeForm } from '../components/car-reporting/car-reporting-code.form';
import { CarCheckForm } from '../components/car-check/car-check.form';
import { TagsService } from '../../../../core/services/tags.service';
import { QaIdentifier } from './../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../shared/models/qa-identifiers';
import { IbanForm } from '../../../../shared/forms/iban.form';
import { CarContactComponent } from '../components/car-contact/car-contact.component';
import { KNXWizardStepRxOptions } from '../../../../components/knx-wizard-rx/knx-wizard-rx.options';
import { CarReportingCodeComponent } from '../components/car-reporting/car-reporting-code.component';
import { CarCheckComponent } from '../components/car-check/car-check.component';
import { CarPaymentComponent } from '../components/car-payment/car-payment.component';
import { CarSummaryComponent } from '../components/car-summary/car-summary.component';
import { AsyncPipe } from '@angular/common';

import * as fromRoot from '../../../reducers';
import * as fromInsurance from '../../../../insurance/reducers';
import * as fromCar from '../../../../car/reducers';
import * as fromCore from '../../../../core/reducers';
import * as assistant from '../../../../core/actions/assistant';
import * as router from '../../../../core/actions/router';
import * as car from '../../../../car/actions/car';
import * as advice from '../../../../insurance/actions/advice';
import * as compare from '../../../../car/actions/compare';
import * as wizardActions from '@app/core/actions/wizard';

@Component({
  providers: [ AsyncPipe ],
  selector: 'knx-car-buy',
  templateUrl: 'car-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarBuyComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carBuyRoot;
  formSteps: Array<KNXWizardStepRxOptions>;
  currentStep: number;

  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  advice$: Observable<any>;
  wizardCurrentStep$: Observable<any>;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              public asyncPipe: AsyncPipe) {
    this.wizardCurrentStep$ = this.store$.select(fromCore.getWizardCurrentStep);
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

    this.currentStep = 0;
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
  }

  // TODO: group in an effect
  resetFlow() {
    this.store$.dispatch(new advice.Reset());
    this.store$.dispatch(new compare.CarCompareResetStateAction());
    this.store$.dispatch(new car.CarResetStateAction());
    this.store$.dispatch(new router.Go({path: ['car']}));
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }
}
