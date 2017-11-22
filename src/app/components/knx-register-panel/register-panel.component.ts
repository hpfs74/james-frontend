import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.scss']
})
export class RegisterPanelComponent {
  @Output() onGoToRegister: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  goToRegister() {
    this.onGoToRegister.emit('goToRegister');
  }
}
