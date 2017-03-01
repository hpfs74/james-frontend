import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Shared components
import { BreadCrumbComponent } from '../components/ki-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from '../components/ki-button-icon/button-icon.component';
import { FeaturesComponent } from '../components/ki-features/features.component';
import { NavbarComponent, FooterComponent } from '../components/ki-navigation';
import { PriceTableComponent, PriceTableItemComponent } from '../components/ki-price-table';
import { VehicleInfoComponent } from '../components/ki-vehicle-info/vehicle-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonIconComponent,
    FeaturesComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    VehicleInfoComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonIconComponent,
    FeaturesComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    VehicleInfoComponent
  ]
})
export class SharedModule { }
