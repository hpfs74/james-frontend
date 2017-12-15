import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarBuyComponent } from './containers/car-buy.component';
import { CarContactComponent } from './containers/car-contact/car-contact.component';
import { CarReportingCodeComponent } from './containers/car-reporting/car-reporting-code.component';
import { CarCheckComponent } from './containers/car-check/car-check.component';
import { CarPaymentComponent } from './containers/car-payment/car-payment.component';
import { CarSummaryComponent } from './containers/car-summary/car-summary.component';

export const carBuyRoutes: Routes = [
  {
    path: '',
    component: CarBuyComponent,
    data: {
      title: 'Nieuwe autoverzekering aanvragen'
    },
    children: [
      { path: '', redirectTo: 'contact-detail', pathMatch: 'full' },
      {
        path: 'contact-detail',
        component: CarContactComponent,
        data: { stepIndex: 0}
      },
      {
        path: 'reporting',
        component: CarReportingCodeComponent,
        data: { stepIndex: 1}
      },
      {
        path: 'check',
        component: CarCheckComponent,
        data: { stepIndex: 2}
      },
      {
        path: 'payment',
        component: CarPaymentComponent,
        data: { stepIndex: 3}
      },
      {
        path: 'summary',
        component: CarSummaryComponent,
        data: { stepIndex: 4}
      },
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
