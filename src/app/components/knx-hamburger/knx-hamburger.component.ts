import { Component, Output, EventEmitter } from '@angular/core';
import { scrollToY } from '../../utils/scroll-to-element.utils';

@Component({
  selector: 'knx-hamburger',
  styleUrls: ['./knx-hamburger.component.scss'],
  templateUrl: './knx-hamburger.component.html'
})
export class KNXHamburgerComponent {
  @Output() onHamburgerClick: EventEmitter<any> = new EventEmitter<any>();
  menuOpened = false;
  constructor() {}

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
    this.onHamburgerClick.emit();
    scrollToY(0, 1500, 'easeInOutQuint');
  }
}
