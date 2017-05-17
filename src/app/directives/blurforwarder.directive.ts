import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  /* tslint:disable */
  selector: 'input, select',
  /* tslint:enable */
})
export class BlurForwarderDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) {}

  @HostListener('blur', ['$event']) public onBlur($event) {
    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-blur', { bubbles: true })]);
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
}
