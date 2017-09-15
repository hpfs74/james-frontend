import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from '../../node_modules/angular-svg-icon';

// @cx
import { CXFormsModule } from '../../node_modules/@cx/forms';
import { TextMaskModule } from '../../node_modules/@cx/input';

// @knx
import { KNXWizardModule } from '@knx/wizard';
import { KNXStepNavigationModule } from '@knx/step-navigation';
import { KNXCollapsiblePanelModule } from '@knx/collapsible-panel';
import { KNXInfoModule } from '@knx/info';
import { KNXModalDialogModule } from '@knx/modal';

/**
 * Shared Modules
 */
import { DropdownModule } from './components/knx-dropdown/dropdown.module';

/** Util Pages */
import { PageNotFoundComponent } from './pages/error/pagenotfound.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

/**
 * Pipes
 */
import { TitleCasePipe, RoundPipe, LicensePlatePipe } from './pipes/';

/**
 * Directives
 */
import { JumpToElementDirective, SidePanelStateDirective } from './directives';


/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AddressLookupComponent } from './components/knx-address-lookup/address-lookup.component';
import { AppPromoBlockComponent } from './components/knx-app-promo/app-promo.component';
import { ButtonIconComponent } from './components/knx-button-icon/button-icon.component';
import { CircleProgressComponent } from './components/knx-circle-progress/circle-progress.component';
import { CarSummaryComponent } from './components/knx-car-summary/car-summary.component';
import { ChatInputComponent } from './components/knx-chat-input/chat-input.component';
import { CookiebarComponent } from './components/knx-cookiebar/cookiebar.component';
import { CollapsePanelComponent } from './components/knx-collapse-panel/collapse-panel.component';
import { CollapseMessageComponent } from './components/knx-collapse-message/collapse-message.component';
import { DashboardItemComponent } from './components/knx-dashboard-item/dashboard-item.component';
import { DonutComponent } from './components/knx-donut/donut.component';
import { FeaturesComponent } from './components/knx-features/features.component';
import { FormGroupInfoComponent } from './components/knx-form-group-info/form-group-info.component';
import { LicensePlateComponent } from './components/knx-input-licenseplate/licenseplate.component';
import { InsuranceResultComponent } from './components/knx-insurance-result/insurance-result.component';
import { InsuranceResultDetailComponent } from './components/knx-insurance-result-detail/insurance-result-detail.component';
import { InsuranceTopListComponent } from './components/knx-insurance-toplist/insurance-toplist.component';
import { DataSummaryComponent } from './components/knx-data-summary/data-summary.component';
import { DataSummaryGroupComponent } from './components/knx-data-summary/data-summary-group.component';
import { DataSummaryRowComponent } from './components/knx-data-summary/data-summary-row.component';
import { NavbarComponent } from './components/knx-navigation';
import { OpeningHoursComponent } from './components/knx-opening-hours/opening-hours.component';
import { PriceTableComponent, PriceItemComponent } from './components/knx-price-table';
import { ReviewSummaryComponent } from './components/knx-review-summary/review-summary.component';
import { StarRatingComponent } from './components/knx-star-rating/star-rating.component';
import { SidePanelComponent } from './components/knx-side-panel/side-panel.component';
import { StepBlocksComponent } from './components/knx-step-blocks/step-blocks.component';
import { StepBlockComponent } from './components/knx-step-blocks/step-block.component';
import { LoaderComponent } from './components/knx-loader/loader.component';
import { TabsComponent } from './components/knx-tabs/tabs.component';
import { TabComponent } from './components/knx-tabs/tab.component';
import { NavUserComponent } from './components/knx-nav-user/nav-user.component';
import { UserGreetingComponent } from './components/knx-user-greeting/user-greeting.component';

export const sharedComponents = [
  TitleCasePipe,
  RoundPipe,
  AppPromoBlockComponent,
  LicensePlatePipe,
  SidePanelStateDirective,
  JumpToElementDirective,
  AddressLookupComponent,
  ButtonIconComponent,
  CircleProgressComponent,
  CarSummaryComponent,
  ChatInputComponent,
  CookiebarComponent,
  CollapsePanelComponent,
  CollapseMessageComponent,
  DashboardItemComponent,
  DonutComponent,
  FeaturesComponent,
  FormGroupInfoComponent,
  LicensePlateComponent,
  InsuranceResultComponent,
  InsuranceResultDetailComponent,
  InsuranceTopListComponent,
  DataSummaryComponent,
  DataSummaryGroupComponent,
  DataSummaryRowComponent,
  OpeningHoursComponent,
  PriceTableComponent,
  PriceItemComponent,
  ReviewSummaryComponent,
  SidePanelComponent,
  StarRatingComponent,
  StepBlocksComponent,
  StepBlockComponent,
  LoaderComponent,
  TabsComponent,
  TabComponent,
  NavUserComponent,
  UserGreetingComponent
];

export const sharedPages = [
  PageNotFoundComponent,
  ThankYouComponent
];

export const sharedModules = [
  CXFormsModule,
  KNXWizardModule,
  KNXStepNavigationModule,
  KNXCollapsiblePanelModule,
  KNXInfoModule,
  KNXModalDialogModule,
  DropdownModule
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    AngularSvgIconModule,
    ...sharedModules
  ],
  declarations: [
    ...sharedComponents,
    ...sharedPages
  ],
  exports: [
    CommonModule,
    FormsModule,
    ...sharedModules,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ...sharedComponents,
    ...sharedPages
  ]
})
export class SharedModule { }
