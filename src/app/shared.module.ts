import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @cx
//Don't import CXFormsModule: breaks lazy loading due to it using BrowserModule instead of CommonModule
import { CXFormsModule } from '../../node_modules/@cx/forms';
import { TextMaskModule } from '../../node_modules/@cx/input';
import { CXWizardModule } from '../../node_modules/@cx/wizard';

/**
 * Pipes
 */
import { TitleCasePipe } from './pipes/titlecase.pipe';


/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AddressLookupComponent } from './components/knx-address-lookup/address-lookup.component';
import { BreadCrumbComponent } from './components/knx-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from './components/knx-button-icon/button-icon.component';
import { CookiebarComponent } from './components/knx-cookiebar/cookiebar.component';
import { FeaturesComponent } from './components/knx-features/features.component';
import { LicensePlateComponent } from './components/knx-input-licenseplate/licenseplate.component';
import { InsuranceResultComponent } from './components/knx-insurance-result/insurance-result.component';
import { NavbarComponent } from './components/knx-navigation';
import { PriceTableComponent, PriceTableItemComponent } from './components/knx-price-table';
import { LoaderComponent } from './components/knx-loader/loader.component';
import { UserDetailComponent } from './components/knx-user-detail/user-detail.component';

export const sharedComponents = [
  TitleCasePipe,
  AddressLookupComponent,
  ButtonIconComponent,
  CookiebarComponent,
  FeaturesComponent,
  LicensePlateComponent,
  InsuranceResultComponent,
  PriceTableComponent,
  PriceTableItemComponent,
  LoaderComponent,
  UserDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    CXFormsModule,
    CXWizardModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    CommonModule,
    FormsModule,
    CXFormsModule,
    CXWizardModule,
    ReactiveFormsModule,
    ...sharedComponents
  ]
})
export class SharedModule { }
