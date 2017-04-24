import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../config.service';
import { InsuranceService } from '../../services/insurance.service';

import { Car } from '../../models/car';
import { ChatMessage } from '../../models/chat-message';
import { Price } from '../../models/price';
import { ChatStreamComponent } from '../../components/knx-chat-stream/';

@Component({
  selector: 'knx-car-page',
  styleUrls: ['car.component.scss'],
  templateUrl: 'car.component.html'
})
export class CarComponent implements OnInit {
  formControlOptions: any;
  myCar: Car;
  chatMessages: ChatMessage[] = [];
  coverages: Price[];
  formSteps: Array<any>;

  constructor(private configService: ConfigService, private insuranceService: InsuranceService) {
  }

  ngOnInit() {
    this.myCar = {
      name: 'PANDA',
      manufacturer: 'FIAT',
      model: 'TURBO',
      year: 2006
    };

    this.formSteps = [
      { title: 'Je gegevens ' },
      { title: 'Resultaten ' },
      { title: 'Afsluiten' }
    ];

    this.coverages = this.insuranceService.getPrices();
  }

  addCarMessage() {
    this.chatMessages.push({ type: 'vehicle', content: this.myCar });
  }

  addMessage() {
    this.chatMessages.push({
      type: 'text',
      content: 'Hoi! Ik ben Anupama. ' +
      'Ik ga je vandaag helpen <b>besparen</b> op je auto-verzekering. ' +
      'Ben je er klaar voor? Let\'s do this!'});
  }

  clearMessages() {
    this.chatMessages = [];
  }

}
