/**
 * The SharedModule contains the components, directives, and pipes that you use everywhere in your app.
 * This module should consist entirely of declarations, most of them exported.
 *
 * The SharedModule may re-export other widget modules, such as CommonModule, FormsModule, and modules
 * with the UI controls that you use most widely.
 *
 * The SharedModule should not have providers for reasons explained previously. Nor should any of its
 * imported or re-exported modules have providers.
 *
 * If you deviate from this guideline, know what you're doing and why.
 * Import the SharedModule in your feature modules, both those loaded when the app starts and those
 * you lazy load later.
 *
 */
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
import { KNXTooltipModule } from '@knx/tooltip';
import { KNXModalDialogModule } from '@knx/modal';
import { KNXCheckboxComponent } from './components/knx-checkbox/checkbox.component';
import { KNXInputComponent } from './components/knx-input/input.component';
import { KNXHamburgerComponent } from './components/knx-hamburger/knx-hamburger.component';
import { KNXNavbarMenuComponent } from './components/knx-navbar-menu/knx-navbar-menu.component';
import { KNXFooterComponent } from './components/knx-footer/knx-footer.component';

/**
 * Shared Modules
 */
import { DropdownModule } from './components/knx-dropdown/dropdown.module';

/**
 * Pipes
 */
import { TitleCasePipe, RoundPipe, LicensePlatePipe, BooleanPipe, JamesTagPipe } from './shared/pipes/';

/**
 * Directives
 */
import {
  BackdropBlurDirective,
  JumpToElementDirective,
  SidePanelStateDirective,
  ClickOutsideDirective,
  QaIdentifierDirective,
  StickyDirective
} from './shared/directives';

/**
 * Shared module for all generic components
 * import components in alphabetic order: easier to find something!
 */
import { AppPromoBlockComponent } from './components/knx-app-promo/app-promo.component';
import { AsyncPreviewComponent } from './components/knx-async-preview/async-preview.component';
import { ButtonIconComponent } from './components/knx-button-icon/button-icon.component';
import { CarInfoComponent } from './components/knx-car-info/car-info.component';
import { CarPreviewComponent } from './components/knx-car-info/car-preview.component';
import { CircleProgressComponent } from './components/knx-circle-progress/circle-progress.component';
import { CollapsePanelComponent } from './components/knx-collapse-panel/collapse-panel.component';
import { CollapseMessageComponent } from './components/knx-collapse-message/collapse-message.component';
import { DashboardItemComponent } from './components/knx-dashboard-item/dashboard-item.component';
import { DonutComponent } from './components/knx-donut/donut.component';
import { DownloadPanelComponent } from './components/knx-download-panel/download-panel.component';
import { FeaturesComponent } from './components/knx-features/features.component';
import { FeatureItemComponent } from './components/knx-features/feature-item.component';
import { FormGroupInfoComponent } from './components/knx-form-group-info/form-group-info.component';
import { LicensePlateComponent } from './components/knx-input-licenseplate/licenseplate.component';
import { InsuranceResultComponent } from './components/knx-insurance-result/insurance-result.component';
import { InsuranceResultDetailComponent } from './components/knx-insurance-result-detail/insurance-result-detail.component';
import { InsuranceTopListComponent } from './components/knx-insurance-toplist/insurance-toplist.component';
import { InfoIconComponent } from './components/knx-info-icon/info-icon.component';
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
import { ServiceGuideComponent } from './components/knx-service-guide/service-guide';
import { PurchasedComponent } from './components/knx-purchased/purchased.component';
import { RegisterPanelComponent } from './components/knx-register-panel/register-panel.component';
import { NavUserComponent } from './components/knx-nav-user/nav-user.component';
import { UserGreetingComponent } from './components/knx-user-greeting/user-greeting.component';

export const sharedComponents = [
  TitleCasePipe,
  RoundPipe,
  BooleanPipe,
  JamesTagPipe,
  AppPromoBlockComponent,
  AsyncPreviewComponent,
  LicensePlatePipe,
  BackdropBlurDirective,
  SidePanelStateDirective,
  JumpToElementDirective,
  ClickOutsideDirective,
  QaIdentifierDirective,
  StickyDirective,
  ButtonIconComponent,
  CarInfoComponent,
  CarPreviewComponent,
  CircleProgressComponent,
  CollapsePanelComponent,
  CollapseMessageComponent,
  DashboardItemComponent,
  DonutComponent,
  DownloadPanelComponent,
  FeaturesComponent,
  FeatureItemComponent,
  FormGroupInfoComponent,
  LicensePlateComponent,
  InsuranceResultComponent,
  InsuranceResultDetailComponent,
  InsuranceTopListComponent,
  InfoIconComponent,
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
  ServiceGuideComponent,
  PurchasedComponent,
  RegisterPanelComponent,
  NavUserComponent,
  UserGreetingComponent,
  KNXCheckboxComponent,
  KNXInputComponent,
  KNXHamburgerComponent,
  KNXNavbarMenuComponent,
  KNXFooterComponent
];

export const sharedModules = [
  CXFormsModule,
  KNXWizardModule,
  KNXStepNavigationModule,
  KNXCollapsiblePanelModule,
  KNXInfoModule,
  KNXTooltipModule,
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
