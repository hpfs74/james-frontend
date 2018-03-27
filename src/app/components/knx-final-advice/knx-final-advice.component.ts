import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { KNXFinalAdviceOptions, DefaultKNXFinalAdviceOptions } from '@app/components/knx-final-advice/knx-final-advice.options';

@Component({
  selector: 'knx-final-advice',
  styleUrls: ['./knx-final-advice.component.scss'],
  templateUrl: './knx-final-advice.component.html'
})
export class KNXFinalAdviceComponent implements AfterViewInit {
  @Input() mobile = false;
  @Input() options: KNXFinalAdviceOptions = DefaultKNXFinalAdviceOptions;
  @ViewChild('mobileButton') mobileButton: ElementRef;
  constructor() {
  }

  ngAfterViewInit() {
    if (this.mobileButton) {
      let element = this.mobileButton.nativeElement;
      let container = document.querySelector('knx-final-advice');
      container.parentElement.insertBefore(element, container.parentElement.lastChild);
    }
  }
}
