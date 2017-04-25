import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Options as InputOptions } from '../../../../node_modules/@cx/input/src/cx-input.options';
import * as InputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';
import { FormValidationErrors } from '../../../../node_modules/@cx/form';

import { LoginService } from './login.service';

@Component({
  selector: 'knx-login',
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public inputMasks = InputMasks;
  public validationErrors;

  constructor(private formBuilder: FormBuilder) {
  }

  // ngOnInit() {
  //
  // }

  // loginBlur(event){
  //   // here we can check if username exists
  // }

  // signIn(event){
  //   // here we will handle the button click
  //   // after use click it
  // }

}
