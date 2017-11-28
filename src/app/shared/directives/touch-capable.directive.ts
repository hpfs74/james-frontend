import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[knxTouchCapable]' })
export class TouchCapableDirective implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit() {
    const touchCapable =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    const touchClass = touchCapable ? 'knx-touch' : 'knx-no-touch';
    this.element.nativeElement.classList.add(touchClass);
  }
}
