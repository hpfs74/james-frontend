import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '@cx/form';


@Component({
  selector: 'knx-password-reset',
  template: `
    <div class="container">
     <knx-registration></knx-registration>
    </div>
  `
})
export class RegistrationPageComponent {

  constructor() {
  }
}
