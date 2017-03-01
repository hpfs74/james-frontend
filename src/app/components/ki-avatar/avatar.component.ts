import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-avatar',
  template: `
  <div class="ki-avatar">
      <div class="ki-avatar-image">
        <img src="/assets/images/avatars/{{ name | lowercase }}.jpg" class="circle"/>
      </div>
      <div class="ki-avatar-detail">
        <div class="ki-avatar-name">{{ name }}</div>
        <div class="ki-avatar-title">{{ title }}</div>
      </div>
  </div>
  `
})
export class AvatarComponent {
  @Input() name: string;
  @Input() title: string;
}
