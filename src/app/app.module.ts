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
import { PriceTableComponent, PriceTableItemComponent } from './components/ki-price-table';
import { FeaturesComponent } from './components/ki-features/features.component';

// Pages
import { OverviewComponent } from './pages/overview/overview.component';

// Styles 'barrel'
import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
    OverviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
