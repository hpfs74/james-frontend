import { AfterViewInit, Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[knxFirstElementFocus]'
})
export class FirstElementFocusDirective implements AfterViewInit {

  constructor(private _eRef: ElementRef, private _renderer: Renderer) {
  }

  private _getInputElement(nativeElement: any): any {
    if (!nativeElement || !nativeElement.children) {
      return undefined;
    }
    if (!nativeElement.children.length && nativeElement.localName === 'input' && !nativeElement.hidden) {
      return nativeElement;
    }

    let input;

    [].slice.call(nativeElement.children).every(c => {
      input = this._getInputElement(c);
      return !input;
    });

    return input;
  }

  ngAfterViewInit() {
    let formChildren = [].slice.call(this._eRef.nativeElement.children);

    formChildren.every(child => {
      let input = this._getInputElement(child);

      if (input) {
        // this._renderer.invokeElementMethod(input, 'focus', []);
        this._renderer.selectRootElement(input).focus();
        return false; // break!
      }

      return true; // continue!
    });
  }
}
