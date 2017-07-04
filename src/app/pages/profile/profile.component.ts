import { Component, OnInit } from '@angular/core';
import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { ChatStreamComponent } from './../../components/knx-chat-stream/chat-stream.component';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { birthDateMask } from '../../utils/base-form.utils';
import { CXPostalCodeValidator } from '@cx/form-control';
import { BaseForm } from '../../forms/base-form';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {
  public chatConfig: AssistantConfig;
  public formBuilder: FormBuilder;
  public profileForm: FormGroup;
  public form: any;
  public avatar: string;
  formGroup: FormGroup;
  formConfig: any; //TODO: refactor to store options here instead of inside template
  addressForm: FormGroup;
  public baseForm: BaseForm;

  constructor( private assistantService: AssistantService, private fb: FormBuilder ) {
    this.chatConfig = assistantService.config;
    this.formBuilder = new FormBuilder();
    var ha = new BaseForm();
    this.addressForm = ha.createAddress(this.fb);

    this.form = {
      avatar: {
        label: '',
        type: 'file',
        inputOptions: {
          placeholder: 'edit avatar'
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      gender: {
        label: 'Geslacht',
        type: 'radio',
        inputOptions: {
          items: [
            {
              label: 'Man',
              value: 'man'
            },
            {
              label: 'Vrouw',
              value: 'woman'
            },
            {
              label: 'Laat ik in het midden',
              value: 'middle'
            }
          ]
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      firstName: {
        label: 'Voornaam',
        inputOptions: {
          placeholder: 'Please insert your Voornaam'
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      secondName: {
        label: 'Achternaam',
        inputOptions: {
          placeholder: 'Please insert your Achternaam'
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      birthday: {
        label: 'Geboortedatum',
        type: 'date',
        inputOptions: {
          placeholder: 'DD / MM / JJJJ',
          transform: birthDateMask.decode,
          textMask: birthDateMask
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      address: {
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      pushNotifications: {
        label: 'Nieuwsbrief',
        type: 'checkbox',
        inputOptions: {
          label: 'lk wil pushberichten ontvangen van Knab Verzekeren',
          value: 'pushNotifications'
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
      emailNotifications: {
        label: '',
        type: 'checkbox',
        inputOptions: {
          label: 'Houd mij via e-mail op de hoogte van het laatste nieuws en persoonlijke aanbiedingen',
          value: 'emailNotifications'
        },
        validationErrors: {
          regexp: 'Your name has to have exactly 5 characters'
        }
      },
    };

    this.profileForm = this.formBuilder.group({
      avatar: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      gender: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      firstName: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      secondName: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      birthday: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      postcode: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10), CXPostalCodeValidator],
      )],
      pushNotifications: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
      emailNotifications: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)]
      )],
    });
  }

  onAddressFound() {
    debugger;
  }

  getAvatar($event) {
    debugger;
    this.avatar = this.form.avatar.formControl.value[0].dataUrl;
    $event.preventDefault();
  }

  save( event ) {
    event.preventDefault();
    Object.keys(this.profileForm.controls).forEach(key => {
      this.profileForm.get(key).markAsTouched();
    });

    if (this.profileForm.valid) {
      console.info('valid!');
    }
    console.info(this);
  }
}
