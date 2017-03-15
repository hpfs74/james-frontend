import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../../models/vehicle';
import { ChatMessage } from '../../models/chat-message';
import { Price } from '../../models/price';
import { ChatStreamComponent } from '../../components/ki-chat-stream/';
import { ContentService } from '../../services/content.service';
import { InsuranceService } from '../../services/insurance.service';

@Component({
  selector: 'ki-car-page',
  styleUrls: ['car.component.scss'],
  templateUrl: 'car.component.html'
})
export class CarComponent implements OnInit {
  formControlOptions: any;
  myCar: Vehicle;
  chatMessages: ChatMessage[] = [];
  coverages: Price[];
  formSteps: Array<any>;

  constructor(private insuranceService: InsuranceService) {
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
    this.chatMessages.push({ type: 'text', content: 'Hello this is me!' });
  }

  clearMessages() {
    this.chatMessages = [];
  }

}
