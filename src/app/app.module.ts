import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Root component
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

// Shared components
import { NavbarComponent, FooterComponent } from './components/ki-navigation';
import { BreadCrumbComponent } from './components/ki-breadcrumb/breadcrumb.component';
import { ButtonIconComponent } from './components/ki-button-icon/button-icon.component';
import { PriceTableComponent, PriceTableItemComponent } from './components/ki-price-table';
import { FeaturesComponent } from './components/ki-features/features.component';

// Feature modules
import { CarModule } from './pages/car/car.module';
import { OverviewComponent } from './pages/overview/overview.component';

// Styles 'barrel'
import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BreadCrumbComponent,
    PriceTableComponent,
    PriceTableItemComponent,
    FeaturesComponent,
    ButtonIconComponent,
    OverviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
