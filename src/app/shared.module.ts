import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @cx
//Don't import CXFormsModule: breaks lazy loading due to it using BrowserModule instead of CommonModule
// import { CXFormsModule } from '../../node_modules/@cx/forms';
import { CXInputComponent, TextMaskModule } from '../../node_modules/@cx/input';
import { CXSelectComponent } from '../../node_modules/@cx/select';
import { CXCheckboxComponent } from '../../node_modules/@cx/checkbox';
import { CXRadioComponent } from '../../node_modules/@cx/radio';
import { CXFormGroupComponent } from '../../node_modules/@cx/form-group';
import { CXSliderComponent } from '../../node_modules/@cx/slider';

/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AvatarComponent } from './components/ki-avatar/avatar.component';
import { BreadCrumbComponent } from './components/ki-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from './components/ki-button-icon/button-icon.component';
import { CookiebarComponent } from './components/ki-cookiebar/cookiebar.component';
import { ChatStreamComponent, ChatMessageComponent } from './components/ki-chat-stream';
import { FeaturesComponent } from './components/ki-features/features.component';
import { NavbarComponent, FooterComponent } from './components/ki-navigation';
import { PriceTableComponent, PriceTableItemComponent } from './components/ki-price-table';
import { StickerComponent } from './components/ki-sticker/sticker.component';
import { SpinnerComponent } from './components/ki-spinner/spinner.component';
import { UserDetailComponent } from './components/ki-user-detail/user-detail.component';
import { VehicleInfoComponent } from './components/ki-vehicle-info/vehicle-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
    //CXFormsModule
  ],
  declarations: [
    CXInputComponent,
    CXSelectComponent,
    CXCheckboxComponent,
    CXRadioComponent,
    CXSliderComponent,
    CXFormGroupComponent,

    AvatarComponent,
    ChatStreamComponent,
    ChatMessageComponent,
    ButtonIconComponent,
    CookiebarComponent,
    FeaturesComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    StickerComponent,
    SpinnerComponent,
    UserDetailComponent,
    VehicleInfoComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CXInputComponent,
    CXSelectComponent,
    CXCheckboxComponent,
    CXRadioComponent,
    CXSliderComponent,
    CXFormGroupComponent,

    AvatarComponent,
    ButtonIconComponent,
    CookiebarComponent,
    FeaturesComponent,
    ChatStreamComponent,
    ChatMessageComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    StickerComponent,
    SpinnerComponent,
    UserDetailComponent,
    VehicleInfoComponent
  ]
})
export class SharedModule { }
