import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-attendant-message',
  styleUrls: ['./attendant-message.component.scss'],
  template: `
  <div class='cx-container-fluid'>
    <div class='cx-row'>
      <div class='cx-col-sm-6'>
        <div class='ki-attendant-image'>
          <img src='/assets/images/attendants/{{ name }}.jpg' class='clip-circle'/>
        </div>
      </div>
      <div class='cx-col-sm-6 ki-attendant-title'>
        <b>{{ name }}</b><br/>
        {{ title }}
      </div>
    </div>
  </div>
  `
})
export class AttendantMessageComponent {
  @Input() name: string;
  @Input() title: string;
}
