import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { AddressModule } from '../address/address.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChatStreamModule } from '../components/knx-chat-stream/chat-stream.module';
import { ProfileService } from './services/profile.service';

import { ProfileEditComponent } from './containers/edit/edit.component';
import { ProfileOverviewComponent } from './containers/overview/overview.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

import { ProfileEffects } from './effects/profile';
import { SettingsEffects } from './effects/settings';

import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    AddressModule,
    ChatStreamModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([
      ProfileEffects,
      SettingsEffects
    ])
  ],
  declarations: [
    ProfileEditComponent,
    ProfileFormComponent,
    ProfileOverviewComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule {}
