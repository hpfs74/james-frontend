import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { slideUpDownHeightAnimation } from '@app/shared/animations/slide-up-down.animation';
import { Profile } from '@app/profile/models';
import { bounceAnimation } from '@app/shared/animations/bounce.animation';

@Component({
  selector: 'knx-navbar-menu',
  styleUrls: ['./knx-navbar-menu.component.scss'],
  templateUrl: './knx-navbar-menu.component.html',
  animations: [
    slideUpDownHeightAnimation,
    bounceAnimation
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
