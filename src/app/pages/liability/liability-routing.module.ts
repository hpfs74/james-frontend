import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const liabilityRoutes: Routes = [
  {
    // path: '',
    // component: LiabilityComponent,
    // data: {
    //   title: 'Je aansprakelijkheidsverzekering vergelijken'
    // }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(liabilityRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LiabilityRoutingModule { }
