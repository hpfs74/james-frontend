import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-async-preview',
  styleUrls: ['./async-preview.component.scss'],
  template: `
    <div *ngIf="loading" class="knx-message knx-message--hint knx-message--arrow-top knx-message--pending">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <div *ngIf="loaded && !loading" class="knx-message knx-message--hint knx-message--arrow-top"
      [ngClass]="modifier">
      <ng-content></ng-content>
    </div>
  `
})
export class AsyncPreviewComponent {
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() modifier: string;
}
