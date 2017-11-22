import { Component, Input, group } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface KNXStepRxComponent {
  onShow: () => Observable<any>;
  onNext: () => Observable<any>;
  onBack: () => Observable<any>;
}

// export abstract class KNXStepRxComponent {
//   abstract onShowStep: () => void;

//   _isCurrent: boolean = false;
//   direction: string = 'none';

//   set isCurrent(current: boolean) {
//     this._isCurrent = current;
//   }

//   get isCurrent() {
//     return this._isCurrent;
//   }

//   // animationDone() {
//   //   if (this.onShowStep && this.direction !== 'none') {
//   //     this.onShowStep();
//   //   }

//   //   setTimeout(() => {
//   //     this.direction = 'none';
//   //   });
//   // }
// }
