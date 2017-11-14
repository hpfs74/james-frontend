import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: '[knxBackdropBlur]' })
export class BackdropBlurDirective implements OnChanges {
  @Input() enableBlur: boolean;

  constructor(private element: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const backDropClass = 'backdrop-blur';

    if (this.enableBlur) {
      this.element.nativeElement.classList.add(backDropClass);
    } else {
      this.element.nativeElement.classList.remove(backDropClass);
    }
  }
}
