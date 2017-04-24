import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-avatar',
  template: `
  <div class="knx-avatar">
      <div class="knx-avatar-image">
        <img src="/assets/images/avatars/{{ name | lowercase }}.jpg" class="circle"/>
      </div>
      <div class="knx-avatar-detail">
        <div class="knx-avatar-name">{{ name }}</div>
        <div class="knx-avatar-title">{{ title }}</div>
      </div>
  </div>
  `
})
export class AvatarComponent {
  @Input() name: string;
  @Input() title: string;
}
