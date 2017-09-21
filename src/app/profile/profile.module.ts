import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChatStreamModule } from '../components/knx-chat-stream/chat-stream.module';
import { ProfileService } from './services/profile.service';

import { ProfileComponent } from './containers/profile.component';
import { ProfileEditComponent } from './components/profile-edit.component';

import { ProfileEffects } from './effects/profile';
import { SettingsEffects } from './effects/settings';

import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([
      ProfileEffects,
      SettingsEffects
    ])
  ],
  declarations: [
    ProfileComponent,
    ProfileEditComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule {
}
