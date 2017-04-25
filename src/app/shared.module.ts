import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @cx
//Don't import CXFormsModule: breaks lazy loading due to it using BrowserModule instead of CommonModule
// import { CXFormsModule } from '../../node_modules/@cx/forms';
import { CXInputComponent, TextMaskModule } from '../../node_modules/@cx/input';
import { CXSelectComponent } from '../../node_modules/@cx/select';
import { CXCheckboxComponent } from '../../node_modules/@cx/checkbox';
import { CXFileUploadComponent } from '../../node_modules/@cx/file-upload';
import { CXRadioComponent } from '../../node_modules/@cx/radio';
import { CXFormGroupComponent } from '../../node_modules/@cx/form-group';
import { CXSliderComponent } from '../../node_modules/@cx/slider';
import { CXTextareaComponent } from '../../node_modules/@cx/textarea';

/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AvatarComponent } from './components/knx-avatar/avatar.component';
import { AddressLookupComponent } from './components/knx-address-lookup/address-lookup.component';
import { BreadCrumbComponent } from './components/knx-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from './components/knx-button-icon/button-icon.component';
import { CookiebarComponent } from './components/knx-cookiebar/cookiebar.component';
import { ChatStreamComponent, ChatMessageComponent } from './components/knx-chat-stream';
import { FeaturesComponent } from './components/knx-features/features.component';
import { NavbarComponent } from './components/knx-navigation';
import { PriceTableComponent, PriceTableItemComponent } from './components/knx-price-table';
import { SpinnerComponent } from './components/knx-spinner/spinner.component';
import { UserDetailComponent } from './components/knx-user-detail/user-detail.component';
import { VehicleInfoComponent } from './components/knx-vehicle-info/vehicle-info.component';

export const sharedComponents = [
  AvatarComponent,
  AddressLookupComponent,
  ButtonIconComponent,
  CookiebarComponent,
  FeaturesComponent,
  ChatStreamComponent,
  ChatMessageComponent,
  PriceTableComponent,
  PriceTableItemComponent,
  SpinnerComponent,
  UserDetailComponent,
  VehicleInfoComponent
];

export const cxComponents = [
  CXInputComponent,
  CXSelectComponent,
  CXCheckboxComponent,
  CXFileUploadComponent,
  CXRadioComponent,
  CXSliderComponent,
  CXFormGroupComponent,
  CXTextareaComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
    //CXFormsModule
  ],
  declarations: [
    ...cxComponents,
    ...sharedComponents
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...cxComponents,
    ...sharedComponents
  ]
})
export class SharedModule { }
