import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Container and subroot-level components
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { PageNotFoundComponent } from './pages/error/pagenotfound.component';
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';
import { SpinnerComponent } from './components/ki-spinner/spinner.component';

// Layout components
import { NavbarComponent, FooterComponent } from './components/ki-navigation';
import { BreadCrumbComponent } from './components/ki-breadcrumb/breadcrumb.component';

// Feature modules
import { SharedModule } from './shared.module';
import { CarModule } from './pages/car/car.module';

// Styles 'barrel'
import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    CarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    BreadCrumbComponent,
    FooterComponent,
    NavbarComponent,
    // Pages
    CookiesPageComponent,
    OverviewComponent,
    PageNotFoundComponent,
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
