import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '@cx/form';


@Component({
  selector: 'knx-password-reset',
  template: `
      <div class="container">
        <div class="row">
        <div class="col-md-6 p-3">
          <knx-registration></knx-registration>
        </div>
        <div class="col-md-6 p-3">
          <knx-download-panel></knx-download-panel>
        </div>
        </div>
      </div>
  `
})
export class RegistrationPageComponent {

  constructor() {
  }
}
