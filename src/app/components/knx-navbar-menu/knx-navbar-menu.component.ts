import { Component, Input, Output, EventEmitter } from '@angular/core';

import { slideUpDownHeightAnimation } from '@app/shared/animations/slide-up-down.animation';
import { Profile } from '@app/profile/models';
import { dropdDowndAnimation } from '@app/shared/animations/dropdown.animation';

@Component({
  selector: 'knx-navbar-menu',
  styleUrls: ['./knx-navbar-menu.component.scss'],
  templateUrl: './knx-navbar-menu.component.html',
  animations: [
    slideUpDownHeightAnimation,
    dropdDowndAnimation
  ]
})
export class KNXNavbarMenuComponent {
  @Input() animationState: string;
  @Input() profile: Profile;
  @Input() loggedIn: boolean;
  @Input() mobile = true;
  @Output() onAnimationDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMenuItemClick: EventEmitter<string> = new EventEmitter<string>();
}
