import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-avatar',
  styleUrls: ['./avatar.component.scss'],
  template: `
  <div class="knx-avatar">
    <img class="knx-avatar__image" src="/assets/images/avatars/avatar.png" alt="{{name}}">
  </div>
  `
})
export class AvatarComponent {
  @Input() name = 'Liza';
}
