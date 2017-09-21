import { Inject, Directive, ElementRef, Renderer, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import * as fromCore from '../../core/reducers';

@Directive({
  selector: '[knxSidePanelState]'
})
export class SidePanelStateDirective implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private el: ElementRef,
    private renderer: Renderer,
    private store$: Store<fromCore.State>) {
  }

  ngOnInit() {
    this.store$.select(fromCore.getLeftSidenavState)
      .subscribe(isLeftSideBarOpen => {
        if (isLeftSideBarOpen) {
          this.document.body.style.overflow = 'hidden';
        } else {
          this.document.body.style.overflow = 'auto';
        }
      });
  }
}
