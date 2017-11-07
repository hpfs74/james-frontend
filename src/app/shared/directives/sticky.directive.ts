import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

const DEFAULT_CSS_OPTIONS: StickyCssOptions = {
  position: 'fixed',
  top: '90px',
  width: '326.6px'
};

interface StickyCssOptions {
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
}

const DEFAULT_OFFSET = 90;
@Directive({ selector: '[knxSticky]' })
export class StickyDirective implements AfterViewInit, OnDestroy {
  nativeElement: any;
  scrollSubscription$: Subscription;
  innerStickValue: boolean;
  innerCssOptions: StickyCssOptions;
  innerOffset: number;
  @Input() cssOptions?: StickyCssOptions;
  @Input() offset?: number;
  @Input('knxSticky') set knxSticky(stick: boolean) {
    this.innerStickValue = stick;
    this.setStickySubscription(stick);
  }

  get knxSticky(): boolean {
    return this.innerStickValue;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = this.el.nativeElement;
    if (!this.cssOptions) {
      this.innerCssOptions = DEFAULT_CSS_OPTIONS;
    } else {
      this.innerCssOptions = this.cssOptions;
    }
    if (!this.offset) {
      this.innerOffset = DEFAULT_OFFSET;
    } else {
      this.innerOffset = this.offset;
    }
  }

  ngAfterViewInit() {
    this.setStickySubscription(this.knxSticky);
  }

  ngOnDestroy() {
    this.unsetStickySubscription();
  }

  unsetStickySubscription() {
    if (this.scrollSubscription$) {
      this.scrollSubscription$.unsubscribe();
    }
  }

  setStickySubscription(stick: boolean) {
    if (stick) {
      this.scrollSubscription$ = Observable.fromEvent(window, 'scroll')
      .subscribe(e => {
        if (window.pageYOffset > this.innerOffset) {
          if (this.nativeElement.getAttribute('class').indexOf('knx-sticky') < 0) {
            Object.keys(this.innerCssOptions).forEach(key => {
              this.renderer.setStyle(this.nativeElement, key, this.innerCssOptions[key]);
            });
            this.renderer.addClass(this.nativeElement, 'knx-sticky');
          }
        } else {
          if (this.nativeElement.getAttribute('class').indexOf('knx-sticky') > -1) {
            Object.keys(this.innerCssOptions).forEach(key => {
              this.renderer.removeStyle(this.nativeElement, key);
            });
            this.renderer.removeClass(this.nativeElement, 'knx-sticky');
          }
        }
      });
    } else {
      this.unsetStickySubscription();
    }
  }
}
