import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Options as InputOptions } from '../../../../node_modules/@cx/input/src/cx-input.options';
import * as InputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';
import { FormValidationErrors } from '../../../../node_modules/@cx/form';

import { LoginService } from './login.service';

@Component({
  selector: 'knx-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [LoginService]
})
export class ForgotPasswordComponent implements OnInit {

  public inputMasks = InputMasks;
  public validationErrors;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    return ;
  }


  resetPasswordRequest() {
    return ;
  }
}
