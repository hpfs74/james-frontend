import { Component, OnInit } from '@angular/core';
import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { birthDateMask } from '../../utils/base-form.utils';
import { CXPostalCodeValidator } from '@cx/form-control';
import { BaseForm } from '../../forms/base-form';
import * as assistant from '../../actions/assistant';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  formBuilder: FormBuilder;
  profileForm: FormGroup;
  chatConfig: AssistantConfig;
  baseForm: BaseForm;
  addressForm: FormGroup;
  form: any;
  avatar: string;
  formGroup: FormGroup;
  chatMessages$: Observable<Array<ChatMessage>>;

  constructor( private assistantService: AssistantService, private fb: FormBuilder, private store: Store<fromRoot.State>, ) {
    this.baseForm = new BaseForm();
    this.addressForm = this.baseForm.createAddress(this.fb);

    this.chatConfig = assistantService.config;
    this.chatMessages$ = store.select(fromRoot.getAssistantMessageState);

    this.form = {
      avatar: {
        label: '',
        type: 'file',
        events: ['file-uploaded'],
        inputOptions: {
          placeholder: ' '
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

    this.formBuilder = new FormBuilder();
    this.profileForm = this.formBuilder.group({
      avatar: ['', Validators.compose([])],
      gender: ['', Validators.compose([])],
      firstName: ['', Validators.compose([Validators.maxLength(20)])],
      secondName: ['', Validators.compose([Validators.maxLength(20)])],
      birthday: ['', Validators.compose([])],
      postcode: ['', Validators.compose([CXPostalCodeValidator],)],
      pushNotifications: ['', Validators.compose([])],
      emailNotifications: ['', Validators.compose([])],
    });
  }

  ngOnInit() {
    this.store.dispatch(new assistant.ClearAction());
    this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.profile.hello));
  }

  loadAvatar( $event ) {
    if (this.form.avatar.formControl.value.length) {
      this.avatar = this.form.avatar.formControl.value[0].dataUrl;
    }

    $event.event.preventDefault();
  }

  save( $event ) {
    Object.keys(this.profileForm.controls).forEach(key => {
      this.profileForm.get(key).markAsTouched();
    });

    if (this.profileForm.valid) {
      // console.info('valid! make the backend call!');
    }

    $event.preventDefault();
  }
}
