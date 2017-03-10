import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';

// Layout components
import { OverviewComponent } from '../overview/overview.component';
import { NavbarComponent, FooterComponent } from '../../components/ki-navigation';
import { BreadCrumbComponent } from '../../components/ki-breadcrumb/breadcrumb.component';

/**
 * Home is the container module for all feature modules that are available after logging in
 *
 * @export
 * @class HomeModule
 */
@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    BreadCrumbComponent,
    FooterComponent,
    NavbarComponent,
    OverviewComponent,
  ]
})
export class HomeModule { }
