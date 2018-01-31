import { Component, ContentChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'knx-wizard-rx',
  styleUrls: ['./knx-wizard-rx.component.scss'],
  templateUrl: './knx-wizard-rx.component.html',
})
export class KNXWizardRxComponent {
  @ContentChild('knxWizardSidebar') sidebar: ElementRef;
  constructor(private changeDetector: ChangeDetectorRef) {}
  onActivate(componentRef: any): void {
    this.changeDetector.detectChanges();
  }
}
