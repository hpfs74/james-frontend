import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { KnabNavbarComponent, KnabFooterComponent } from './component/navigation';
import { KnabPriceTableComponent, KnabPriceTableItemComponent } from './component/knab-price-table';

import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    KnabNavbarComponent,
    KnabFooterComponent,
    KnabPriceTableComponent,
    KnabPriceTableItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
