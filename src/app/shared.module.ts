import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AvatarComponent } from './components/ki-avatar/avatar.component';
import { BreadCrumbComponent } from './components/ki-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from './components/ki-button-icon/button-icon.component';
import { CookiebarComponent } from './components/ki-cookiebar/cookiebar.component';
import { FeaturesComponent } from './components/ki-features/features.component';
import { MessageComponent } from './components/ki-chat-stream';
import { NavbarComponent, FooterComponent } from './components/ki-navigation';
import { PriceTableComponent, PriceTableItemComponent } from './components/ki-price-table';
import { VehicleInfoComponent } from './components/ki-vehicle-info/vehicle-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvatarComponent,
    MessageComponent,
    ButtonIconComponent,
    CookiebarComponent,
    FeaturesComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    VehicleInfoComponent
  ],
  exports: [
    AvatarComponent,
    ButtonIconComponent,
    CookiebarComponent,
    CommonModule,
    FeaturesComponent,
    MessageComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    ReactiveFormsModule,
    VehicleInfoComponent
  ]
})
export class SharedModule { }
