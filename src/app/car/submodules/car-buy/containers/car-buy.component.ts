import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AssistantConfig } from '../../../../core/models/assistant';
import { ChatMessage } from '../../../../components/knx-chat-stream/chat-message';
import { TagsService } from '../../../../core/services/tags.service';
import { QaIdentifier } from './../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../shared/models/qa-identifiers';
import { KNXWizardStepRxOptions } from '../../../../components/knx-wizard-rx/knx-wizard-rx.options';
import { AsyncPipe } from '@angular/common';

import * as fromRoot from '../../../reducers';
import * as fromInsurance from '../../../../insurance/reducers';
import * as fromCore from '../../../../core/reducers';
import * as assistant from '../../../../core/actions/assistant';
import * as car from '../../../../car/actions/car';
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

  constructor(private store$: Store<fromRoot.State>,
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
