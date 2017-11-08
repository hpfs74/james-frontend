import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const DEFAULT_CSS_OPTIONS: StickyCssOptions = {
  position: 'fixed',
  top: '90px',
  width: '326.6px'
};
interface StickyCssOptions {
  [key: string]: any;
}
const DEFAULT_OFFSET = 90;

@Directive({ selector: '[knxSticky]' })
export class StickyDirective implements AfterViewInit, OnDestroy {
  nativeElement: any;
  scrollSubscription$: Subscription;
  innerCssOptions: StickyCssOptions;
  innerOffset: number;
  @Input() stickyCssOptions: StickyCssOptions;
  @Input() stickyOffset: number;
  @Input('knxSticky') set knxSticky(stick: boolean) {
    this.setStickySubscription(stick);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = this.el.nativeElement;
  }

  ngAfterViewInit() {
    if (!this.stickyCssOptions) {
      this.innerCssOptions = DEFAULT_CSS_OPTIONS;
    } else {
      this.innerCssOptions = this.stickyCssOptions;
    }
    if (!this.stickyOffset) {
      this.innerOffset = DEFAULT_OFFSET;
    } else {
      this.innerOffset = this.stickyOffset;
    }
  }

  ngOnDestroy() {
    this.unsetStickySubscription();
  }

  unsetStickySubscription() {
    if (this.scrollSubscription$) {
      this.scrollSubscription$.unsubscribe();
      this.unsetCssProperties();
    }
  }

  setStickySubscription(stick: boolean) {
    if (stick) {
      let observable = Observable.fromEvent(window, 'scroll');
      this.scrollSubscription$ = observable.subscribe(e => {
        if (window.pageYOffset > this.innerOffset) {
          this.setCssProperties();
        } else {
          this.unsetCssProperties();
        }
      });
    } else {
      this.unsetStickySubscription();
    }
  }

  setCssProperties() {
    if (this.nativeElement.getAttribute('class').indexOf('knx-sticky') < 0) {
      Object.keys(this.innerCssOptions).forEach(key => {
        this.renderer.setStyle(this.nativeElement, key, this.innerCssOptions[key]);
      });
      this.renderer.addClass(this.nativeElement, 'knx-sticky');
    }
  }

  unsetCssProperties() {
    if (this.nativeElement.getAttribute('class').indexOf('knx-sticky') > -1) {
      Object.keys(this.innerCssOptions).forEach(key => {
        this.renderer.removeStyle(this.nativeElement, key);
      });
      this.renderer.removeClass(this.nativeElement, 'knx-sticky');
    }
  }
}
