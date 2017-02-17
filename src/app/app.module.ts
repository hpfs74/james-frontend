import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { KnabNavbarComponent } from './navbar.component';
import { KnabFooterComponent } from './footer.component';

import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    KnabNavbarComponent,
    KnabFooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
