import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdviceComponent } from './containers/car-advice/car-advice.component';
import { CarPurchasedComponent } from './containers/car-purchased/car-purchased.component';

import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarExtrasComponent } from './components/car-extras/car-extras.component';
import { KNXWizardRxComponent } from '../../../components/knx-wizard-rx/knx-wizard-rx.component';
import { InsuranceTopListComponent } from './components/insurance-toplist/insurance-toplist.component';

export const carAdviceRoutes: Routes = [
  {
    path: '',
    component: CarAdviceComponent,
    data: {
      title: 'Je autoverzekering vergelijken'
    },
    children: [
      { path: '', redirectTo: 'detail/1', pathMatch: 'full' },
      { path: 'detail/:step-index', component: CarDetailComponent },
      { path: 'extras/:step-index', component: InsuranceTopListComponent },
    ]
  },
  {
    path: 'purchased',
    component: CarPurchasedComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(carAdviceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarAdviceRoutingModule { }
