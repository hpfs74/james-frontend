import { Component, ViewChild, ElementRef, OnInit, ContentChild } from '@angular/core';

@Component({
  selector: 'knx-ribbon',
  styleUrls: ['./knx-ribbon.component.scss'],
  templateUrl: './knx-ribbon.component.html'
})
export class KnxRibbonComponent implements OnInit {
  @ContentChild('knxPresent') knxPresent: ElementRef;
  presentWidth = 'initial';
  presentHeight = 'initial';
  constructor(public element: ElementRef) { }

  ngOnInit() {
    let presentElement = this.element.nativeElement.querySelector('.knx-present').children[0];
    if (presentElement) {
      this.presentWidth = presentElement.offsetWidth + 'px';
      this.presentHeight = presentElement.offsetHeight + 'px';
    }
  }
}
