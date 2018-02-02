import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { InsuranceReviewRegistrationForm } from './insuatance-review-registration.form';
import * as FormUtils from '../../utils/base-form.utils';

@Component({
  selector: 'knx-insurance-review-registration',
  styleUrls: ['./insurance-review-registration.component.scss'],
  template: `
    <knx-collapsible-panel [title]="title">
      <div class="knx-collapsible-panel__content">
        <div class="row">
          <div class="col-sm-12">

            <div class="container">
              <div class="row">
                <div class="col-md-8">
                  <b>En ontvang jouw overzicht van alle verzekeringen</b>

                  <div class="knx-registration">
                      <form [formGroup]="form.formGroup"
                            autocomplete="off">
                        <knx-form-group
                          [formControlName]="form.formConfig.email.formControlName"
                          [options]="form.formConfig.email">
                        </knx-form-group>

                        <knx-form-group
                          [formControlName]="form.formConfig.password.formControlName"
                          [options]="form.formConfig.password">
                        </knx-form-group>

                        <div class="knx-registration__actions">
                          <div class="knx-registration__error" *ngIf="form.formGroup.valid && errorMessage">
                            {{ errorMessage || 'Het registreren is helaas niet gelukt, probeer het alsjeblieft opnieuw.' }}
                          </div>

                          <span class="knx-registration__meta-security">Ben je al klant? <a (click)="login($event)">Ga naar login</a></span>
                        </div>
                      </form>
                    </div>
                </div>

                <div class="col-sm-4 hidden-xs">
                  <img src="/assets/images/avatars/avatar-fullsize.png" alt="lisa full size" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </knx-collapsible-panel>
  `
})
export class InsuranceReviewRegistrationComponent implements OnInit {
  @Input() title: string;
  @Output() onRegistrationFormValidation: EventEmitter<InsuranceReviewRegistrationForm> = new EventEmitter();
  @Output() onLogin: EventEmitter<any> = new EventEmitter();

  form: InsuranceReviewRegistrationForm;
  errorMessage: string;

  ngOnInit() {
    this.form = new InsuranceReviewRegistrationForm(new FormBuilder());

    this.form.formGroup.get('email').valueChanges.subscribe((value) => {
      FormUtils.validateForm(this.form.formGroup);
      FormUtils.showFormErrors(this.form);

      this.onRegistrationFormValidation.emit(this.form);
    });

    this.form.formGroup.get('password').valueChanges.subscribe((value) => {
      FormUtils.validateForm(this.form.formGroup);
      FormUtils.showFormErrors(this.form);

      this.onRegistrationFormValidation.emit(this.form);
    });
  }

  public login(event: any) {
    this.onLogin.emit(event);
  }
}
