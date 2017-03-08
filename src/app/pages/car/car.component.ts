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

  constructor(private contentService: ContentService, private insuranceService: InsuranceService) {
  }

  ngOnInit() {
    this.contentService.getTranslationJSON('car-advice')
      .subscribe(data => {
        this.formControlOptions = data;
      });

    this.myCar = {
      name: 'PANDA',
      manufacturer: 'FIAT',
      model: 'TURBO',
      year: 2006
    };

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
