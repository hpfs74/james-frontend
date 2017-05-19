import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @cx
import * as noUiSlider from 'nouislider';
import { CXFormsModule } from '../../node_modules/@cx/forms';
import { TextMaskModule } from '../../node_modules/@cx/input';
import { CXWizardModule } from '../../node_modules/@cx/wizard';

import { AngularSvgIconModule } from 'angular-svg-icon';

/**
 * Pipes
 */
import { TitleCasePipe, RoundPipe } from './pipes/';

/**
 * Directives
 */
import { BlurForwarderDirective, JumpToElementDirective } from './directives';


/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AddressLookupComponent } from './components/knx-address-lookup/address-lookup.component';
import { BreadCrumbComponent } from './components/knx-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from './components/knx-button-icon/button-icon.component';
import { CookiebarComponent } from './components/knx-cookiebar/cookiebar.component';
import { CollapsePanelComponent } from './components/knx-collapse-panel/collapse-panel.component';
import { CollapseMessageComponent } from './components/knx-collapse-message/collapse-message.component';
import { DonutComponent } from './components/knx-donut/donut.component';
import { FeaturesComponent } from './components/knx-features/features.component';
import { LicensePlateComponent } from './components/knx-input-licenseplate/licenseplate.component';
import { InsuranceResultComponent } from './components/knx-insurance-result/insurance-result.component';
import { InsuranceResultDetailComponent } from './components/knx-insurance-result-detail/insurance-result-detail.component';
import { InsuranceTopListComponent } from './components/knx-insurance-toplist/insurance-toplist.component';
import { NavbarComponent } from './components/knx-navigation';
import { PriceTableComponent, PriceItemComponent } from './components/knx-price-table';
import { LoaderComponent } from './components/knx-loader/loader.component';
import { TabsComponent } from './components/knx-tabs/tabs.component';
import { TabComponent } from './components/knx-tabs/tab.component';
import { UserDetailComponent } from './components/knx-user-detail/user-detail.component';

export const sharedComponents = [
  TitleCasePipe,
  RoundPipe,
  JumpToElementDirective,
  AddressLookupComponent,
  ButtonIconComponent,
  CookiebarComponent,
  CollapsePanelComponent,
  CollapseMessageComponent,
  DonutComponent,
  FeaturesComponent,
  LicensePlateComponent,
  InsuranceResultComponent,
  InsuranceResultDetailComponent,
  InsuranceTopListComponent,
  PriceTableComponent,
  PriceItemComponent,
  LoaderComponent,
  TabsComponent,
  TabComponent,
  UserDetailComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    CXFormsModule,
    CXWizardModule,
    AngularSvgIconModule
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
    AngularSvgIconModule,
    ...sharedComponents
  ]
})
export class SharedModule { }
