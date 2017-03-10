import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from '../car/car.component';
import { CarDetailComponent } from '../car/car-detail.component';

export const carRoutes: Routes = [
  {
    path: '',
    component: CarComponent,
    data: {
      breadcrumb: 'Je autoverzekering vergelijken'
    }
    // children: [
    //   {
    //     path: 'advice',
    //     component: CarAdviceComponent,
    //     data: {
    //       breadcrumb: 'Autoverzekering vergelijken'
    //     }
    //   }
    // ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(carRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarRoutingModule { }
