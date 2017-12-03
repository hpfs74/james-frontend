import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KNXWizardRxService } from './knx-wizard-rx.service';
import { KNXWizardRxComponent } from './knx-wizard-rx.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store/src/store_module';
import { EffectsModule } from '@ngrx/effects';
import { WizardEffects } from '@app/components/knx-wizard-rx/knx-wizard-rx.effects';

const COMPONENTS = [
  KNXWizardRxComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([
      WizardEffects
    ])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class KnxWizardRxModule { }
