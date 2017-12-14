import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KNXWizardRxComponent } from './knx-wizard-rx.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
const COMPONENTS = [
  KNXWizardRxComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class KnxWizardRxModule { }
