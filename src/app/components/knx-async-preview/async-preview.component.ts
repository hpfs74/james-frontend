import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'knx-async-preview',
  styleUrls: ['./async-preview.component.scss'],
  template: `
    <div *ngIf="loading" class="knx-message knx-message--hint knx-message--arrow-top-left knx-message--pending">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <div *ngIf="loaded && !loading" class="knx-message knx-message--hint knx-message--arrow-top-left"
      [ngClass]="modifier">
      <ng-content></ng-content>
    </div>
  `
})
/**
 * shows the content only when it is ready
 *
 * @example
 *
 * <knx-async-preview [loading]="isCarLoading$ | async" [loaded]="!(isCarLoading$| async)">
 *    <div>This content will be showed when the loaded is true</div>
 * </knx-async-preview>
 */
export class AsyncPreviewComponent /*implements OnInit*/ {
  /** while true show the loader and hide the content */
  @Input() loading: boolean;
  /** while true hide the loader and show the content*/
  @Input() loaded: boolean;
  /** css modifier to add to the class */
  @Input() modifier: string;

  // ngOnInit() {
  //   if (this.loading === null || this.loading === undefined) {
  //     throw new Error('you must specify [loading] in the component input');
  //   }
  //
  //   if (this.loaded === null || this.loaded === undefined) {
  //     throw new Error('you must specify [loaded] in the component input');
  //   }
  // }
}
