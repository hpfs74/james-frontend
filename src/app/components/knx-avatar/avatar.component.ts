import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-avatar',
  styleUrls: ['./avatar.component.scss'],
  template: `
  <div class="knx-avatar">
      <div class="knx-avatar__detail">
        <div class="knx-avatar__name">{{ name }}</div>
        <div class="knx-avatar__title">{{ title }}</div>
      </div>

      <img class="knx-avatar__image" src="/assets/images/avatars/avatar.png">
  </div>
  `
})
export class AvatarComponent {
  @Input() name: string;
  @Input() title: string;
}
