import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdviceComponent } from './containers/car-advice/car-advice.component';
import { CarSavedComponent } from './containers/car-saved/car-saved.component';

import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarExtrasComponent } from './components/car-extras/car-extras.component';
import { InsuranceTopListComponent } from './components/insurance-toplist/insurance-toplist.component';
import { CarReviewComponent } from './components/car-review/car-review.component';
import { CarThankYouComponent } from '../car-advice/components/car-thank-you/car-thank-you.component';

export const carAdviceRoutes: Routes = [
  {
    path: '',
    component: CarAdviceComponent,
    data: {
      title: 'Je autoverzekering vergelijken'
    },
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      {
        path: 'detail',
        component: CarDetailComponent,
        data: { stepIndex: 0}
      },
      {
        path: 'extras',
        component: InsuranceTopListComponent,
        data: { stepIndex: 1}
      },
      {
        path: 'review',
        component: CarReviewComponent,
        data: { stepIndex: 2}
      },
    ]
  },
  {
    path: 'purchased',
    component: CarSavedComponent
  },
  {
    path: 'thank-you',
    component: CarThankYouComponent
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
