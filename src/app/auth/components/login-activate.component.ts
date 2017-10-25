import { Inject, Component, Output, EventEmitter } from '@angular/core';

/**
 * @export
 * @class LoginActivateComponent
 */
@Component({
  selector: 'knx-login-activate',
  templateUrl: './login-activate.component.html',
  styleUrls: ['./login-activate.component.scss']
})
export class LoginActivateComponent {
  @Output() onGoToRegister: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  goToRegister() {
    this.onGoToRegister.emit('goToRegister');
  }
}
