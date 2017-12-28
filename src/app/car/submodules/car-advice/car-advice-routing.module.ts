import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdviceComponent } from './containers/car-advice/car-advice.component';
import { CarSavedComponent } from './containers/car-saved/car-saved.component';
import { CarDetailComponent } from './containers/car-detail/car-detail.component';
import { CarExtrasComponent } from './containers/car-extras/car-extras.component';
import { InsuranceTopListComponent } from './containers/insurance-toplist/insurance-toplist.component';
import { CarReviewComponent } from './containers/car-review/car-review.component';
import { CarThankYouComponent } from '../car-advice/containers/car-thank-you/car-thank-you.component';
import { CanActivateCarFlowGuard } from '@app/core/services';

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
        canActivate: [CanActivateCarFlowGuard],
        component: InsuranceTopListComponent,
        data: { stepIndex: 1}
      },
      {
        path: 'review',
        canActivate: [CanActivateCarFlowGuard],
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
    canActivate: [CanActivateCarFlowGuard],
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
