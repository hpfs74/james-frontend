import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarBuyComponent } from './containers/car-buy.component';
import { CarThankYouComponent } from './components/car-thank-you/car-thank-you.component';
import { CarContactComponent } from './components/car-contact/car-contact.component';
import { CarReportingCodeComponent } from './components/car-reporting/car-reporting-code.component';
import { CarCheckComponent } from './components/car-check/car-check.component';
import { CarPaymentComponent } from './components/car-payment/car-payment.component';
import { CarSummaryComponent } from './components/car-summary/car-summary.component';

export const carBuyRoutes: Routes = [
  {
    path: ':adviceId',
    component: CarBuyComponent,
    data: {
      title: 'Nieuwe autoverzekering aanvragen'
    },
    children: [
      { path: ':adviceId/contact-detail/:step-index', component: CarContactComponent},
      { path: ':adviceId/reporting/:step-index', component: CarReportingCodeComponent},
      { path: ':adviceId/check/:step-index', component: CarCheckComponent},
      { path: ':adviceId/payment/:step-index', component: CarPaymentComponent},
      { path: ':adviceId/summary/:step-index', component: CarSummaryComponent},
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(carBuyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarBuyRoutingModule { }
