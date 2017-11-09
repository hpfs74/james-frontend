import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { slideUpDownHeightAnimation } from '../../shared/animations/slide-up-down.animation';

@Component({
  selector: 'knx-dropdown-menu-s',
  styleUrls: ['./knx-dropdown-menu.component.scss'],
  templateUrl: './knx-dropdown-menu.component.html',
  animations: [slideUpDownHeightAnimation]
})
export class KNXDropdownMenuComponent {
  @Input() animationState: string;
  @Output() onAnimationDone: EventEmitter<boolean> = new EventEmitter<boolean>();
}
