import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class KNXWizardRxService {
  onNext: Subject<any> = new Subject();
  onBack: Subject<any> = new Subject();
  constructor() {}

  nextStep(): void {
    this.onNext.next('next step');
  }

  prevStep(): void {
    this.onBack.next('previous step');
  }
}
