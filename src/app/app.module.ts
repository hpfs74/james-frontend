import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Container and subroot-level components
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
//import { PageNotFoundComponent } from './pages/error/pagenotfound.component';
import { CookiesPageComponent } from './pages/cookies/cookies-page.component';

// Feature modules
import { SharedModule } from './shared.module';
import { HomeModule } from './pages/home/home.module';

// Styles 'barrel'
import '../styles/styles.scss';

// NOTE: Ensure AppRoutingModule is always imported last!
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    CookiesPageComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
