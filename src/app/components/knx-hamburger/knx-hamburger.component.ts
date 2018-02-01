import { Component, Output, EventEmitter, Input } from '@angular/core';
import { scrollToY } from '../../utils/scroll-to-element.utils';

@Component({
  selector: 'knx-hamburger',
  styleUrls: ['./knx-hamburger.component.scss'],
  templateUrl: './knx-hamburger.component.html'
})
export class KNXHamburgerComponent {
  @Input() animationState: any;
  @Output() onHamburgerClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  toggleMenu() {
    this.onHamburgerClick.emit();
    scrollToY(0, 1500, 'easeInOutQuint', true);
  }
}
