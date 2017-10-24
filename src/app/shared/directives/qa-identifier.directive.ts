import { Directive, Input, ElementRef, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[knxQaIdentifier]' })
export class QaIdentifierDirective implements OnInit {
  @Input() qaRoot: string;
  @Input() qaIdentifier: string;

  nativeElement: any;

  constructor(private el: ElementRef, private viewContainerRef: ViewContainerRef, private renderer: Renderer2) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit() {
    const qaAttributeName = 'data-qa-id';
    const qaPrefix = 'knx-qa';

    // add "data-qa-id" attribute
    if (this.qaRoot && this.qaIdentifier) {
      const qaAttributeValue = `${qaPrefix}-${this.qaRoot.replace(/[^\w\s]/gi, '')}-${this.qaIdentifier}`;
      this.renderer.setAttribute(this.el.nativeElement, qaAttributeName, qaAttributeValue);
    }
  }
}
