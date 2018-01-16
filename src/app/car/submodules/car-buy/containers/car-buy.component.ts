import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AssistantConfig } from '@app/core/models/assistant';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { TagsService } from '@app/core/services/tags.service';
import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { AsyncPipe } from '@angular/common';

import * as fromCar from '@app/car/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromCore from '@app/core/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as car from '@app/car/actions/car';
import * as wizardActions from '@app/core/actions/wizard';
import { KNXWizardRxService } from '@app/core/services/wizard.service';

@Component({
  providers: [ AsyncPipe ],
  selector: 'knx-car-buy',
  templateUrl: 'car-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarBuyComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carBuyRoot;
  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  advice$: Observable<any>;

  constructor(private store$: Store<fromCar.State>,
              private tagsService: TagsService,
              public asyncPipe: AsyncPipe,
              public knxWizardService: KNXWizardRxService) {}

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
    if (advice.license) {
      this.store$.dispatch(new car.GetMeldcode(advice.license));
    }
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

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }
}
