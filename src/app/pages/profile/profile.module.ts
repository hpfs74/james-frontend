import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChatStreamModule } from '../../components/knx-chat-stream/chat-stream.module';

import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit.component';
import { ProfileSettingsComponent } from './profile-settings.component';

@NgModule({
  imports: [
    SharedModule,
    ChatStreamModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ProfileSettingsComponent
  ],
  providers: [
  ]
})
export class ProfileModule {
}
