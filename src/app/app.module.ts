import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent, FooterComponent } from './component/navigation';
import { PriceTableComponent, PriceTableItemComponent } from './component/price-table';

import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PriceTableComponent,
    PriceTableItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
