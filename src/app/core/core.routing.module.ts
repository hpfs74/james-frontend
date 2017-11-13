import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth-guard.service';
import { AppComponent } from './containers/app.component';
import { TagsService } from '../core/services/tags.service';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'car',
    pathMatch: 'full',
    canActivateChild: [AuthGuard]
    // loadChildren: '../dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'car',
    canActivateChild: [AuthGuard],
    loadChildren: '../car/car.module#CarModule'
  },
  {
    path: 'account',
    canActivateChild: [AuthGuard],
    loadChildren: '../profile/profile.module#ProfileModule'
    // resolve: {
    //   'tags': APP_INITIALIZER
    // }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreRoutingModule,
      providers: [AuthGuard, TagsService]
    };
  }
}
