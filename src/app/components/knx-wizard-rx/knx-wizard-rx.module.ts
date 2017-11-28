import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KNXWizardRxService } from './knx-wizard-rx.service';
import { KNXWizardRxComponent } from './knx-wizard-rx.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  KNXWizardRxComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    KNXWizardRxService
  ]
})
export class KnxWizardRxModule { }
