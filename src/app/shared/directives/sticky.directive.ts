import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
// declare var Stickyfills: any;
import * as Stickyfill from 'stickyfilljs';
import { Observable, Subscription } from 'rxjs/Rx';

const DEFAULT_OPTIONS: StickyOptions = {
  position: 'fixed',
  top: '90px',
  width: '326.6px'
};

interface StickyOptions {
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
}

@Directive({ selector: '[knxSticky]' })
export class StickyDirective implements AfterViewInit, OnDestroy {
  nativeElement: any;
  scrollSubscription$: Subscription;
  innerStickValue: boolean;
  @Input() options?: StickyOptions;
  @Input('knxSticky') set knxSticky(stick: boolean) {
    this.innerStickValue = stick;
    this.setStickySubscription(stick);
  }

  get knxSticky(): boolean {
    return this.innerStickValue;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = this.el.nativeElement;
    if (!this.options) {
      this.options = DEFAULT_OPTIONS;
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
      .throttleTime(100)
      .subscribe(e => {
        if (window.pageYOffset > 90) {
          Object.keys(this.options).forEach(key => {
            this.renderer.setStyle(this.nativeElement, key, this.options[key]);
          });
        } else {
          Object.keys(this.options).forEach(key => {
            this.renderer.removeStyle(this.nativeElement, key);
          });
        }
      });
    } else {
      this.unsetStickySubscription();
    }
  }
}
