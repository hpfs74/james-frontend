import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { slideUpDownHeightAnimation } from '../../shared/animations/slide-up-down.animation';

@Component({
  selector: 'knx-navbar-menu',
  styleUrls: ['./knx-navbar-menu.component.scss'],
  templateUrl: './knx-navbar-menu.component.html',
  animations: [slideUpDownHeightAnimation]
})
export class KNXNavbarMenuComponent {
  @Input() animationState: string;
  @Output() onAnimationDone: EventEmitter<boolean> = new EventEmitter<boolean>();
}
