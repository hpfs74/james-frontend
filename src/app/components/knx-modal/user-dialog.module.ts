import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KNXModalDialogModule } from '@knx/modal';

import { SharedModule } from '../../shared.module';
import { UserDialogService } from './user-dialog.service';
import { LoginModalComponent } from '../../pages/login/login-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    KNXModalDialogModule.forRoot()
  ],
  exports: [
    LoginModalComponent
  ],
  declarations: [
    LoginModalComponent
  ],
  providers: [
    UserDialogService
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class UserDialogModule { }
