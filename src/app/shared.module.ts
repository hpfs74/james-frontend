import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

// @cx
import { CXFormsModule } from '@cx/forms';
import { TextMaskModule } from '@cx/input';

// @knx
import { KNXWizardModule } from '@knx/wizard';
import { KNXStepNavigationModule } from '@knx/step-navigation';
import { KNXCollapsiblePanelModule } from '@knx/collapsible-panel';
import { KNXInfoModule } from '@knx/info';
import { KNXModalDialogModule } from '@knx/modal';
import { KNXCheckboxComponent } from './components/knx-checkbox/checkbox.component';
import { KNXInputComponent } from './components/knx-input/input.component';
/**
 * Shared Modules
 */
import { DropdownModule } from './components/knx-dropdown/dropdown.module';

/**
 * Pipes
 */
import { TitleCasePipe, RoundPipe, LicensePlatePipe, BooleanPipe } from './shared/pipes/';

/**
 * Directives
 */
import { JumpToElementDirective, SidePanelStateDirective, ClickOutsideDirective } from './shared/directives';


/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AppPromoBlockComponent } from './components/knx-app-promo/app-promo.component';
import { AsyncPreviewComponent } from './components/knx-async-preview/async-preview.component';
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
import { FeatureItemComponent } from './components/knx-features/feature-item.component';
import { FormGroupInfoComponent } from './components/knx-form-group-info/form-group-info.component';
import { LicensePlateComponent } from './components/knx-input-licenseplate/licenseplate.component';
import { InsuranceResultComponent } from './components/knx-insurance-result/insurance-result.component';
import { InsuranceResultDetailComponent } from './components/knx-insurance-result-detail/insurance-result-detail.component';
import { InsuranceTopListComponent } from './components/knx-insurance-toplist/insurance-toplist.component';
import { NavbarComponent } from './components/knx-navbar';
import { OpeningHoursComponent } from './components/knx-opening-hours/opening-hours.component';
import { OfflineIndicatorComponent, OfflineBarComponent } from './components/knx-offline-indicator/offline-indicator.component';
import { PasswordStrengthComponent } from './components/knx-password-strength/password-strength.component';
import { PriceTableComponent, PriceItemComponent } from './components/knx-price-table';
import { ReviewSummaryComponent } from './components/knx-review-summary/review-summary.component';
import { StarRatingComponent } from './components/knx-star-rating/star-rating.component';
import { SidePanelComponent } from './components/knx-side-panel/side-panel.component';
import { StepBlocksComponent } from './components/knx-step-blocks/step-blocks.component';
import { StepBlockComponent } from './components/knx-step-blocks/step-block.component';
import { LoaderComponent } from './components/knx-loader/loader.component';
import { TabsComponent } from './components/knx-tabs/tabs.component';
import { TabComponent } from './components/knx-tabs/tab.component';
import { ThankYouComponent } from './components/knx-thank-you/thank-you.component';
import { NavUserComponent } from './components/knx-nav-user/nav-user.component';
import { UserGreetingComponent } from './components/knx-user-greeting/user-greeting.component';
import { DownloadPanelComponent } from './auth/components/download-panel.component';

export const sharedComponents = [
  TitleCasePipe,
  RoundPipe,
  BooleanPipe,
  AppPromoBlockComponent,
  AsyncPreviewComponent,
  LicensePlatePipe,
  SidePanelStateDirective,
  JumpToElementDirective,
  ClickOutsideDirective,
  ButtonIconComponent,
  CircleProgressComponent,
  CarSummaryComponent,
  ChatInputComponent,
  CookiebarComponent,
  CollapsePanelComponent,
  CollapseMessageComponent,
  DashboardItemComponent,
  DownloadPanelComponent,
  DonutComponent,
  FeaturesComponent,
  FeatureItemComponent,
  FormGroupInfoComponent,
  LicensePlateComponent,
  InsuranceResultComponent,
  InsuranceResultDetailComponent,
  InsuranceTopListComponent,
  OpeningHoursComponent,
  OfflineIndicatorComponent,
  OfflineBarComponent,
  PasswordStrengthComponent,
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
  ThankYouComponent,
  NavUserComponent,
  UserGreetingComponent,
  KNXCheckboxComponent,
  KNXInputComponent
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    ...sharedModules,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ...sharedComponents,
  ]
})
export class SharedModule { }
