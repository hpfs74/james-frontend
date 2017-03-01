import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Shared components
import { AvatarComponent } from '../components/ki-avatar/avatar.component';
import { BreadCrumbComponent } from '../components/ki-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from '../components/ki-button-icon/button-icon.component';
import { FeaturesComponent } from '../components/ki-features/features.component';
import { NavbarComponent, FooterComponent } from '../components/ki-navigation';
import { PriceTableComponent, PriceTableItemComponent } from '../components/ki-price-table';
import { VehicleInfoComponent } from '../components/ki-vehicle-info/vehicle-info.component';
import { MessageComponent } from '../components/ki-chat-stream';
import { CookiewallComponent } from '../components/ki-cookiewall/cookiewall.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvatarComponent,
    MessageComponent,
    ButtonIconComponent,
    CookiewallComponent,
    FeaturesComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    VehicleInfoComponent
  ],
  exports: [
    AvatarComponent,
    ButtonIconComponent,
    CookiewallComponent,
    CommonModule,
    FeaturesComponent,
    FormsModule,
    MessageComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    ReactiveFormsModule,
    VehicleInfoComponent
  ]
})
export class SharedModule { }
