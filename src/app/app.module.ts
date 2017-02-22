import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Root component
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

// Shared components
import { NavbarComponent, FooterComponent } from './component/ki-navigation';
import { BreadCrumbComponent } from './component/ki-breadcrumb/breadcrumb.component';
import { PriceTableComponent, PriceTableItemComponent } from './component/ki-price-table';

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
    OverviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
