import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Shared components
import { NavbarComponent, FooterComponent } from '../components/ki-navigation';
import { BreadCrumbComponent } from '../components/ki-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from '../components/ki-button-icon/button-icon.component';
import { PriceTableComponent, PriceTableItemComponent } from '../components/ki-price-table';
import { FeaturesComponent } from '../components/ki-features/features.component';
import { VehicleInfoComponent } from '../components/ki-vehicle-info/vehicle-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PriceTableComponent,
    PriceTableItemComponent,
    FeaturesComponent,
    ButtonIconComponent,
    VehicleInfoComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    PriceTableComponent,
    PriceTableItemComponent,
    FeaturesComponent,
    ButtonIconComponent,
    VehicleInfoComponent
  ]
})
export class SharedModule { }
