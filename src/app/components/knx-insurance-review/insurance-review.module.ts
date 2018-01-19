import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { InsuranceReviewBenefitsComponent } from './insurance-review-benefits.component';
import { InsuranceReviewDocumentsComponent } from './insurance-review-documents.component';
import { InsuranceReviewRegistrationComponent } from './insurance-review-registration.component';
import { InsuranceReviewCarComponent } from './insurance-review-car.component';
import {
  InsuranceReviewRowComponent,
  InsuranceReviewRowContentComponent,
  InsuranceReviewRowLabelComponent,
  InsuranceReviewRowInfoComponent,
  InsuranceReviewRowValueComponent,
  InsuranceReviewRowIconComponent,
} from './insurance-review-row.component';
import { InsuranceReviewComponent } from './insurance-review.component';

const exportableDeclarations = [
  InsuranceReviewBenefitsComponent,
  InsuranceReviewDocumentsComponent,
  InsuranceReviewRegistrationComponent,
  InsuranceReviewCarComponent,
  InsuranceReviewRowComponent,
  InsuranceReviewRowContentComponent,
  InsuranceReviewRowLabelComponent,
  InsuranceReviewRowValueComponent,
  InsuranceReviewRowIconComponent,
  InsuranceReviewRowInfoComponent,
  InsuranceReviewComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ...exportableDeclarations
  ],
  declarations: [
    ...exportableDeclarations
  ]
})
export class InsuranceReviewModule { }

export * from './insurance-review-benefits.component';
export * from './insurance-review-documents.component';
export * from './insurance-review-car.component';
export * from './insurance-review-row.component';
export * from './insurance-review.component';
