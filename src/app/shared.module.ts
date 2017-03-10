import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// @cx
import { CXFormsModule } from '../../node_modules/@cx/forms';
import { CXFormGroupComponent } from '../../node_modules/@cx/form-group';

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
import { UserDetailComponent } from './components/ki-user-detail/user-detail.component';
import { VehicleInfoComponent } from './components/ki-vehicle-info/vehicle-info.component';

@NgModule({
  imports: [
    CommonModule,
    CXFormsModule
  ],
  declarations: [
    AvatarComponent,
    ChatStreamComponent,
    ChatMessageComponent,
    ButtonIconComponent,
    CookiebarComponent,
    FeaturesComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    StickerComponent,
    UserDetailComponent,
    VehicleInfoComponent
  ],
  exports: [
    CXFormGroupComponent,
    AvatarComponent,
    ButtonIconComponent,
    CookiebarComponent,
    CommonModule,
    FeaturesComponent,
    ChatStreamComponent,
    ChatMessageComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    ReactiveFormsModule,
    StickerComponent,
    UserDetailComponent,
    VehicleInfoComponent
  ]
})
export class SharedModule { }
