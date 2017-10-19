import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '@cx/form';


@Component({
  selector: 'knx-password-reset',
  template: `
      <div class="row">
        <div class="col-4 offset-2 flex-start">
          <knx-registration></knx-registration>
        </div>
        <div class="col-4 flex-end">
          <knx-download-panel></knx-download-panel>
        </div>
      </div>
  `
})
export class RegistrationPageComponent {

  constructor() {
  }
}
