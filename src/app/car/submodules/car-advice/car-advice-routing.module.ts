import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdviceComponent } from './containers/car-advice/car-advice.component';
import { CarPurchasedComponent } from './containers/car-purchased/car-purchased.component';

export const carAdviceRoutes: Routes = [
  {
    path: '',
    component: CarAdviceComponent,
    data: {
      title: 'Je autoverzekering vergelijken'
    }
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
